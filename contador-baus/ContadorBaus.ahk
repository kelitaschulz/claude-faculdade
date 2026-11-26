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
global W := 230, H := 150
global GOLD := "FFC83D"
g := Gui("+AlwaysOnTop -Caption +ToolWindow +E0x20")
g.BackColor := "1B1230"
g.MarginX := 0, g.MarginY := 0

; faixa dourada no topo
g.Add("Progress", "x0 y0 w" W " h5 Background" GOLD)

; titulo
g.SetFont("s10 bold cB9A8E6", "Segoe UI")
g.Add("Text", "x0 y14 w" W " Center BackgroundTrans", "🎁  BAÚS DA PARTIDA")

; numero grande
g.SetFont("s38 bold c" GOLD, "Segoe UI Black")
txtMain := g.Add("Text", "x0 y32 w" W " h62 Center BackgroundTrans", "0")

; divisoria
g.Add("Progress", "x30 y100 w" (W-60) " h1 Background3A2C5C")

; rodape
g.SetFont("s9 norm cD8D0F0", "Segoe UI")
txtSub := g.Add("Text", "x0 y108 w" W " Center BackgroundTrans", "")
g.SetFont("s8 norm c8A7BB0", "Segoe UI")
txtRec := g.Add("Text", "x0 y128 w" W " Center BackgroundTrans", "")

g.Show("x20 y220 w" W " h" H " NoActivate")
WinSetRegion("0-0 w" W " h" H " R22-22", g.Hwnd)
WinSetTransparent(225, g.Hwnd)
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
    Flash(n > 0 ? "FFFFFF" : "FF6B6B")
}

EndMatch() {
    global match, startTime
    SaveMatch()
    match := 0
    startTime := A_Now
    Refresh()
    Flash("6BFFB0")
    ToolTip("✔ Partida salva!", 20, 190)
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
    global match, txtMain, txtSub, txtRec
    s := Stats()
    txtMain.Value := match
    txtSub.Value := "Hoje: " (s.tBaus + match) " baús  •  " s.tPart " partidas"
    txtRec.Value := "🏆 Recorde: " Max(s.best, match) " baús"
}

Flash(color) {
    global txtMain, GOLD
    txtMain.SetFont("c" color)
    SetTimer(() => txtMain.SetFont("c" GOLD), -250)
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
