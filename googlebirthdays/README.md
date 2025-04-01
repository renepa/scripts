# Google Birthdays

Mit diesem Script kann man die Geburtstage aus seinen Kontakte in seinen Kalender übernehmen.

## Datenquelle
Der Zugriff auf deine Kontakte erfolgt über die GoogleAPI. Diese musst du zuvor freigeben und einen Schlüssel generieren

## Abhängigkeiten
- ts-node
- uvm.

## Verwendung

**Aktuell musst du dir ein Token für deine API mit deinem ClientSecret und ClientID von Google holen:**

Grant Type:       Authorization Code
Callback URL:     https://oauth.pstmn.io/v1/callback
Auth URL:         https://accounts.google.com/o/oauth2/v2/auth
Access Token URL: https://oauth2.googleapis.com/token


Scope:  https://www.googleapis.com/auth/contacts.readonly 
        https://www.googleapis.com/auth/calendar.events.owned 
        https://www.googleapis.com/auth/calendar.calendarlist

Client Authentication:  Send as Basic Auth Header

**Lege eine .env Datei mit folgendem Inhalt an:**

API_TOKEN = <Empfangenes Token>
PEOPLE_API = 'https://people.googleapis.com/v1/people/me'
CALENDAR_API = 'https://www.googleapis.com/calendar/v3/calendars/<CalendarID>'

## Funktionen

add:  Hinzufügen ALLER 

### Textformatierung

Hervorhebungen lassen sich in Markdown folgendermaßen gestalten:

- **Text fett**: `**fett**`
- *Text kursiv*: `*fett*`

Außerdem gibt es verschiedene Überschriften:

# H1
## H2
### H3
#### H4
##### H5
###### H6

Die Überschriften unterscheiden sich jeweils durch die Anzahl der vorangestellten Rauten `## H2`.

### Aufzählungen

Markdown bietet die Möglichkeit verschiedene Aufzählungen anzulegen.

Unsortierte Aufzählungen mit vorangestellten Bindestrichen `-`:

- Listeneintrag
- anderer Listeneintrag
- noch ein Listeneintrag

Sortierte Aufzählung mit vorangestellten Zahlen `1.`:

1. Erster Listeneintrag
2. Zweiter Listeneintrag
3. Dritter Listeneintrag

### Links und Bilder

Links bestehen jeweils aus einem Linktext und einer URL `[Linktext](http://github.com/br-data)`.

Beispiel: [Zur README-Vorlage](https://github.com/digitalegarage/open-source-guidelines/blob/master/README-template.md)

Bilder können nach dem gleichen Prinzip eingebunden werden. Einziger Unterschied ist das führende Ausrufezeichen `![Bildbeschreibung](https://de.wikipedia.org/wiki/Datei:GitHub_logo_2013.svg)`

![Github-Logo](https://de.wikipedia.org/wiki/Datei:GitHub_logo_2013.svg)

### Code

Unformatierte Codefragmente können im Paragraphen mit Backticks `this.function()` angezeigt werden oder als ganze Code-Blöcke mit drei Backticks in der ersten und letzten Zeile. Für passendes Syntax-Highlighting muss in der ersten Zeile die Skriptsprache angegeben werden `javascript`.

Beispiel:

```javascript
function add(a, b) {
  return a+b
}

add(1, 2) // returns 3
```

## Probleme

Manchmal funktioniert der Markdown-Renderer nicht. In diesem Fall hilft meistens ein Neustart des Text-Editors.

## Verbesserungen

- Beispiel-Readme auf Englisch hinzufügen
- Einstellungen im Text-Editor ausführlicher beschreiben

## Dank und Quellen

- Philosophie: [Art of README](https://github.com/noffle/art-of-readme)
- Markdown-Beispiele von [Github Markdown](https://guides.github.com/features/mastering-markdown/) und [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)