# Jara Haffter Portfolio — Anleitung

## Ordnerstruktur
```
portfolio/
  index.html       ← Hauptdatei (Startseite + alle Projektseiten)
  css/
    style.css      ← Alle Styles
  js/
    main.js        ← Navigation, Animationen, Projektseiten
  assets/
    images/        ← Hier kommen deine Bilder rein
```

## Bilder einfügen

Im Code siehst du überall `<div class="img-placeholder ..."></div>`.
Diese ersetzt du durch echte Bilder so:

**Vorher:**
```html
<div class="img-placeholder hero-img-box"></div>
```

**Nachher:**
```html
<img src="assets/images/jara-foto.jpg" alt="Jara Haffter" class="hero-img-box">
```

### Welches Bild wohin?

| Klasse             | Wo            | Empfohlene Grösse   |
|--------------------|---------------|---------------------|
| hero-img-box       | Hero (rechts) | 760×950px           |
| ueber-img-box      | Über mich     | 600×800px           |
| kontakt-img-box    | Kontakt       | 520×680px           |
| proj-img           | Projekt-Fotos | 800×600px           |
| projekt-img        | Karten Grid   | 600×450px           |
| qr-img             | QR-Codes      | 240×240px           |
| logo-img           | Foodfestival Logo | 240×160px       |
| plakat-img         | Plakat Vorschau | 320×568px         |
| illus-img          | Illustrationen | 240×240px          |

## E-Mail & Telefon anpassen

In `index.html` suche nach:
- `href="mailto:jara@example.com"` → durch deine echte E-Mail ersetzen
- `href="tel:+41"` → durch deine Telefonnummer ersetzen

## Google Schriften

Die Schriften Bodoni Moda + Lato werden von Google Fonts geladen.
Internetverbindung beim Öffnen nötig, sonst Fallback auf Georgia/Sans-Serif.

## Live Server starten

1. VS Code öffnen
2. Rechtsklick auf `index.html`
3. "Open with Live Server"
4. Browser öffnet sich automatisch
