# Web Ausculta 2.0: koncept

**Nezverejňovať, kým verzia 2.0 nie je v App Store.** Web opisuje nákupy (Ausculta Pro, príspevky), atlas, EKG so zvukom a ďalšie funkcie, ktoré verzia 1.0 nemá. Kým je v obchode alebo v kontrole verzia 1.0, verejný web musí zodpovedať jej (priečinok `web/`, ten ostáva bez zmeny).

Pripravil Claude (Opus 5.5), 13. 10. 2026; upravené 17. 10. 2026 (Fable 5.1) pre build 103: bez počítadla nádychov, bez experimentálnej sondy AirPod (v EÚ sa sonda AirPod neponúka), bez konkrétnych cien (2.3.14), bez viet o kupujúcich 1.x (prevod odstránený), filtre Zvon / Membrána / Široké. Slovenské stránky sú zdroj, anglické (`en/`) generuje `tools/build_en.py`.

## Čo sa zmenilo oproti 1.0

**Domov (index.html)**
- Úvod spomína atlas ukážok z otvorených výučbových databáz a stiahnutie zadarmo.
- Sonda AirPod: ponúka sa len tam, kde iOS dá vysokokvalitné spojenie (iOS 26, mimo EÚ); v EÚ sa neponúka (od buildu 103, experimentálna voľba odstránená).
- Funkcie: nové karty **Atlas ukážok**, **EKG a zvuk srdca**; karta Nahrávky spomína nefiltrovanú kópiu (spolu 8 kariet; karta Počítadlo nádychov odstránená 17. 10.).
- Nová sekcia **Zadarmo a Ausculta Pro** (odkaz `index.html#pro`): čo je zadarmo, čo pridáva Pro, jednorazový nákup (cenu ukáže App Store), príspevky nič neodomykajú. (Karta o kupujúcich pred 2.0 a ceny odstránené 17. 10.)

**Podpora (support.html)**
- Nové otázky: Dá sa v EÚ použiť sonda AirPod? (odpoveď od 17. 10.: nie, použite sondu iPhone), Čo je nefiltrovaná kópia nahrávky?, Odkiaľ sú zvuky v atlase?, Čo je Ausculta Pro a čo ostáva zadarmo?, Ako obnovím nákup…, Čo sú príspevky… (otázka o kúpe pred verziou 2.0 odstránená 17. 10.)
- Tabuľka slúchadiel: AirPods v EÚ „použite sondu iPhone“.

**Súkromie (privacy.html)**
- Nová časť **3. Nákupy v aplikácii** (platby spracúva Apple, appka nedostáva platobné ani osobné údaje), ostatné časti prečíslované (4 až 8).
- Nefiltrované kópie a stav nákupu v zozname údajov, karta „Nákupy cez Apple“, atlas a odkazy na ďalšie aplikácie autora nič neodosielajú.
- Dátum: „Platné od vydania verzie 2.0“.

**Technické info (methodology.html)**
- Cesta zvuku: nové kroky **Nefiltrovaná kópia** (odobratá pred filtrom) a **Vlastné pásmo (Pro)**.
- Nové sekcie **Ako sú pripravené ukážky v atlase** (výber, filtrovanie, prevzorkovanie, hlasitosť, nábeh a dobeh, tabuľka databáz a licencií) a **EKG a zvuk srdca na jednej časovej osi** (bez meraní).

**Skript:** `AUSCULTA_WEB=web_2.0 python3 tools/build_en.py` použije tabuľku `T` upravenú o `T_V2` (nové a vypustené vety). Bez premennej skript generuje `web/` presne ako doteraz.

## Postup v deň vydania 2.0

Predpoklad: verzia 2.0 je vydaná v App Store a cena appky je prepnutá na Zadarmo.

1. Záloha živého webu: `cp -R web ~/Desktop/web_1.0_zaloha`
2. Ak chcete v súkromí presný dátum namiesto „Platné od vydania verzie 2.0“, zmeňte ho v `web_2.0/privacy.html` aj v `T_V2["privacy.html"]` v `tools/build_en.py`.
3. Vygenerujte angličtinu: `AUSCULTA_WEB=web_2.0 python3 tools/build_en.py` (musí skončiť štyrmi riadkami `ok`).
4. Prepíšte živý zdroj: `rsync -a --exclude README_DRAFT.md web_2.0/ web/`
5. Nasaďte do oboch repozitárov GitHub Pages, **dzanino/AirPods-Pulse** (adresa v appke a v App Store Connect) aj **dzanino/ausculta-web**: naklonujte ich, skopírujte obsah `web/` (napr. `rsync -a --exclude .git web/ <klon>/`), skontrolujte `git status`, commit a push. Push robí autor alebo agent len s jeho výslovným súhlasom.
6. Skontrolujte https://dzanino.github.io/AirPods-Pulse/ (SK aj EN, podpora, súkromie).
7. Potom požiadajte Claude, aby zlúčil `T_V2` do `T` v `tools/build_en.py`. Kým sa to nestane, `python3 tools/build_en.py` bez premennej nad novým `web/` skončí chybou (hľadá vety verzie 1.0).

Tento súbor (`README_DRAFT.md`) na web nepatrí, krok 4 ho vynecháva.

## Otvorené body
- **HF_Lung_V1:** ak sa pridá do atlasu, doplňte ho do otázky „Odkiaľ sú zvuky v atlase?“ (support), do tabuľky v methodology a do zodpovedajúcich viet v `T_V2`.
- Ceny sú uvedené v USD (základ USA); iné krajiny podľa cenníka App Store. Ak sa ceny zmenia, upravte index, support a `T_V2`.
- Obrázky a ilustrácie sú z verzie 1.0 (atlas a EKG nemajú vlastný obrázok).
