; ===== Contador de Baus - Fortnite =====
; Precisa do AutoHotkey v2 (gratis): https://www.autohotkey.com
;
; F8  = +1 bau
; F7  = -1 bau (corrigir erro)
; F9  = fim da partida (salva no historico e zera)
; F10 = mostrar/esconder o contador
; F11 = abrir o historico (Excel)
; F12 = resumo (hoje e geral)

#Requires AutoHotkey v2.0
#SingleInstance Force
Persistent

global HIST := A_ScriptDir "\historico_baus.csv"
global match := 0
global startTime := A_Now
global visible := true

if !FileExist(HIST)
    FileAppend("data;hora;baus;duracao_min`n", HIST, "UTF-8")

; ---- janelinha por cima do jogo (nao rouba clique) ----
g := Gui("+AlwaysOnTop -Caption +ToolWindow +E0x20")
g.BackColor := "101010"
g.MarginX := 14, g.MarginY := 8
g.SetFont("s22 bold cFFD24A", "Segoe UI")
txtMain := g.Add("Text", "w240 Center", "Baus: 0")
g.SetFont("s10 norm cCCCCCC", "Segoe UI")
txtSub := g.Add("Text", "w240 Center", "")
g.Show("x20 y220 NoActivate")
WinSetTransparent(210, g.Hwnd)
Refresh()

OnExit(SaveOnExit)

*F8::  Add(1)
*F7::  Add(-1)
*F9::  EndMatch()
*F10:: ToggleGui()
*F11:: Run(HIST)
*F12:: ShowSummary()

Add(n) {
    global match
    match := Max(0, match + n)
    Refresh()
}

EndMatch() {
    global match, startTime
    SaveMatch()
    match := 0
    startTime := A_Now
    Refresh()
    ToolTip("Partida salva!", 20, 190)
    SetTimer(() => ToolTip(), -1500)
}

SaveMatch() {
    global match, startTime, HIST
    mins := DateDiff(A_Now, startTime, "Minutes")
    line := FormatTime(, "yyyy-MM-dd") ";" FormatTime(, "HH:mm") ";" match ";" mins "`n"
    FileAppend(line, HIST, "UTF-8")
}

SaveOnExit(*) {
    global match
    if (match > 0)
        SaveMatch()
}

Stats() {
    global HIST
    today := FormatTime(, "yyyy-MM-dd")
    s := {tBaus: 0, tPart: 0, gBaus: 0, gPart: 0, best: 0}
    Loop Read, HIST {
        if (A_Index = 1 || Trim(A_LoopReadLine) = "")
            continue
        f := StrSplit(A_LoopReadLine, ";")
        if (f.Length < 3)
            continue
        b := Integer(f[3])
        s.gBaus += b, s.gPart += 1, s.best := Max(s.best, b)
        if (f[1] = today)
            s.tBaus += b, s.tPart += 1
    }
    return s
}

Refresh() {
    global match, txtMain, txtSub
    s := Stats()
    txtMain.Value := "Baus: " match
    txtSub.Value := "Hoje: " (s.tBaus + match) " baus | " s.tPart " partidas"
}

ToggleGui() {
    global visible, g
    visible := !visible
    visible ? g.Show("NoActivate") : g.Hide()
}

ShowSummary() {
    s := Stats()
    avgT := s.tPart ? Round(s.tBaus / s.tPart, 1) : 0
    avgG := s.gPart ? Round(s.gBaus / s.gPart, 1) : 0
    MsgBox(
        "HOJE`n"
        "  Baus: " s.tBaus "`n  Partidas: " s.tPart "`n  Media: " avgT " por partida`n`n"
        "GERAL`n"
        "  Baus: " s.gBaus "`n  Partidas: " s.gPart "`n  Media: " avgG " por partida`n"
        "  Recorde: " s.best " baus numa partida",
        "Resumo de Baus", "T15")
}
