# No workflows here — deliberately

`deploy.yml` (Deploy to GitHub Pages) was **removed 2026-07-25**.

agmmissioncontrol.com is served by `execution/modal_mission_control.py` (Modal,
password-gated) from the `mission-control-html` volume, which
`render_mission_control.py --commit` publishes to directly.

Pages was disabled at the cutover, but this workflow stayed behind and kept
firing on every push **and** on a scheduled heal pass. With no Pages site to
deploy to, every run failed — 26 failures in one afternoon, each one an email.

**This repo is version history now, not a deploy target.**
