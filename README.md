# Johamar AB – webbplats

Detta är webbplatsen för **Johamar AB**, en byggfirma och renoveringsföretag baserat
i Kungsängen som arbetar i Stockholm och omnejd.

Webbplatsen är byggd som en statisk sida (HTML, CSS, vanilla JavaScript) – inga
ramverk eller byggsteg krävs.

## Innehåll på den här grenen (`gh-pages`)

```
.
├── index.html              Webbplatsens enda sida
├── assets/
│   ├── css/style.css       Allt utseende, animationer och responsiv layout
│   ├── js/main.js          Mobilmeny, scrollanimationer, FAQ-meny, kontaktformulär
│   └── images/
│       ├── logo.png        Johamar AB:s logotyp
│       ├── projects/       Lägg riktiga projektfoton här (se kommentarer i index.html)
│       ├── before-after/   Lägg riktiga före/efter-foton här
│       └── team/           Lägg foto på teamet/grundaren här
└── .nojekyll               Förhindrar att GitHub Pages kör filerna genom Jekyll
```

> Den här grenen är dedikerad för publicering via **GitHub Pages** och innehåller
> webbplatsen i sin helhet i grenens rot. Den huvudsakliga utvecklingen sker på
> andra grenar (t.ex. `main`); slå ihop eller kopiera över ändringar hit innan du
> publicerar en ny version.

## Förhandsgranska lokalt

Webbplatsen är helt statisk, så du kan köra den med valfri enkel webbserver:

```bash
python3 -m http.server 8000
```

Öppna sedan `http://localhost:8000` i webbläsaren.

Alternativ:
- `npx serve .` (kräver Node.js)
- VS Code-tillägget **Live Server** (högerklicka på `index.html` → "Open with Live Server")

## Publicera med GitHub Pages

1. Gå till repositoryts **Settings → Pages**.
2. Under **Build and deployment**, välj **Deploy from a branch**.
3. Välj gren **`gh-pages`** och mapp **`/ (root)`**.
4. Spara. Efter någon minut blir sidan tillgänglig på:
   `https://<ditt-användarnamn>.github.io/<repo-namn>/`
5. Om du har en egen domän (t.ex. `www.johamarbygg.se`): lägg till en `CNAME`-fil
   i grenens rot med domännamnet, och konfigurera en `CNAME`-post hos din
   domänleverantör som pekar mot `<ditt-användarnamn>.github.io`.

### Uppdatera den publicerade webbplatsen

Eftersom `gh-pages` är en fristående gren med webbplatsen i roten:

```bash
git checkout gh-pages
git checkout <din-utvecklingsgren> -- .   # kopiera in nya filer/ändringar
git add -A
git commit -m "Uppdatera webbplatsen"
git push origin gh-pages
```

GitHub Pages bygger om sidan automatiskt vid varje push till `gh-pages`.

## Byta ut platshållarbilder mot riktiga foton

Projektgalleriet, före/efter-sektionen och "Om oss"-bilden använder för
närvarande CSS/SVG-kompositioner istället för fotografier. I `index.html`
finns tydliga kommentarer ovanför varje sektion som visar exakt:

- vilken mapp bilden ska ligga i (`assets/images/projects/`,
  `before-after/` eller `team/`),
- färdig `<img>`-kod att klistra in (med `loading="lazy"`, `width`/`height`
  och beskrivande svensk `alt`-text),
- rekommenderat bildformat, proportioner och CSS-justeringar för en
  responsiv och snabb sida.

## Kontakt

**Johamar AB**
Mullbärstigen 7, 196 34 Kungsängen
Telefon: 072-321 32 32 / 072-032 42 03
E-post: info@johamarbygg.se
