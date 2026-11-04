# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

    npm install
    npm run dev          # open the local URL it prints
    npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
    npm run build        # must finish with no errors before you submit

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information

| Item | Your answer |
| --- | --- |
| Group number | 3 |
| Section | IT3-A |
| Repository URL | https://github.com/AshleyT-dotcom/ccc181-week10-group3 |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (project manager) | Tongao, Ashley | AshleyT-dotcom | `base.css` | Created the repo and added the teammates and instructor. Added the viewport meta tag. Wrote the phone layout and the 768px, 1024px and 1280px rules. |
| 2 | Romo, Krixialyn Erica | krixialynericaromo  | `nav.css` |I wrote the `nav.css`. I made the navbar with Flexbox (stacked links with 48px height on phones, one row from 768px) and the footer with Grid (1 column on phones, 3 columns from 1024px). |
| 3 | Lepana, Nicole Ashley Jules | nicoleashleyjuleslepana-tech | `form.css` |I wrote `form.css`. I made the login form with Flexbox: stacked full-width fields with 48px height and 16px text, and a Show/Hide button beside the password. From 768px the checkbox row and buttons go side by side and the card gets a max-width of 32rem. From 1024px the card gets 2.5rem padding. |

## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

> Before adding the viewport meta tag, the page in DevTools phone mode looked
> zoomed out and the text was tiny, as if the phone screen were about 980px wide.
> After adding `<meta name="viewport" content="width=device-width, initial-scale=1">`
> and refreshing, the page used the real phone width and the text became readable.

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | Pass|
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. |Pass |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. |Pass |
| 1280 px | Content centered and stops at 1200px. |Pass |

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

> At 768 px the navbar turned into one row (brand on the left, links on the
> right). The checkbox and "Forgot password?" moved side by side, and the two
> bottom buttons also moved side by side. At 1024 px the brand panel and the
> login card went side by side, the footer changed to 3 columns, the heading
> became bigger, and the extra list showed up. At 1280 px the content stopped
> stretching and stayed centered at 1200px. We did not see any width that looked
> broken, and there was no sideways scrollbar at any width.

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

> In this activity we learned that mobile-first means we design the phone
> version first, then add more layout when the screen gets wider using
> `min-width` media queries. We also learned how important the viewport meta
> tag is, because without it the phone shows the page like a tiny desktop site.
> Each of us worked on our own CSS file (base, nav, and form), so we did not
> have conflicts when merging. We used Grid for the page layout and footer, and
> Flexbox for the navbar and the form. We also made all buttons, links and
> inputs at least 48px tall so they are easy to tap, and we added
> `:focus-visible` together with `:hover`. Lastly, we learned how to use Git
> and GitHub as a team: working on our own branches, making commits, opening
> pull requests, and having a teammate review before merging.
