# Four targeted resumes

Paste any complete `.tex` file into Overleaf as `main.tex`. Each is standalone. PDFs are compiled from the same sources. Choose SDE for backend/software positions, data for data engineering or Python/SQL analyst roles, AI/ML for applied ML, and general for graduate engineering/AMTS roles.

## Formatting decisions and ATS research

The supplied template's single-column layout, compact Helvetica text, ruled headings and centered name are preserved. Explicit A4 geometry replaces the text-height enlargement that could print below the page. Contacts are ordinary document text rather than a table or page header. School-level details are omitted to prioritize relevant work.

[Greenhouse's parser documentation](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse) identifies columns, graphics, contact text in headers, and complex tables as parsing risks; it also documents a 2.5 MB parsing limit. [Harvard's resume guide](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/) recommends tailoring evidence to the role. [Yale's bullet guide](https://ocs.yale.edu/resources/writing-impactful-resume-bullets/) recommends action, project and result with meaningful quantification.

These are role-family resumes, not matches to a specific vacancy. No employer ATS access or actual application submission was used. Local PDF extraction and layout checks are parsing proxies, not proprietary ATS scores or guarantees. For each application, align the role summary and project order with its actual requirements; add a tool only if you can demonstrate it. The data version emphasizes data engineering and technical analysis; it does not invent Power BI, Tableau, Excel, warehouse, or business stakeholder experience.

## Metric provenance

- ICICI internship: supplied resume; 9 detection phases, 23 recovery stages, 1,673x/12.91x benchmark speedups and 6 defects. Workload scope is retained.
- Fellowship: supplied resume; historical 4 pages/minute and up to 5 characters. Distinct from the current Panel application.
- Research: supplied resume; reported 40% improvement. Original benchmark details should be available for interview discussion.
- WARDEN: local README; 500/500 jobs over 12 worker kills, 60,000 fuzz cases, 37.7% simulated stale-time reduction, query improvement on fixture rows. ML F1 is explicitly synthetic. Advanced local code is newer than the audited public scaffold.
- Panel: audited implementation; 28 voice definitions, 13 styles, two worker threads. These are implementation counts, not adoption or quality metrics.
- CIFAR-10: saved notebook output of 80.40%; README's conflicting 80.50% is not substituted.
- Achievements: supplied resume snapshots. No invented employers, numbers, skills or future outcomes are included.

The original downloadable portfolio resume remains unchanged pending your choice of a replacement.

## Role vocabulary cross-check

Official role descriptions were used as vocabulary references, not as evidence of qualification for a specific vacancy:

- [Amazon graduate SDE](https://www.amazon.jobs/en/jobs/10432923/software-development-engineer-2026): algorithms, data structures and object-oriented design. These map to the SDE/general versions and supported programming experience.
- [Amazon data engineering](https://www.amazon.jobs/en/jobs/10592001/data-engineer-ww-ops-finance-s-a): Python, SQL, ETL, analytics and data quality. These map to DataVerse and the data version; Airflow is deliberately omitted because the supplied evidence does not establish it.
- [Google ML engineering competency guide](https://services.google.com/fh/files/misc/professional_machine_learning_engineer_certification_exam_guide.pdf): building, evaluating and operationalizing models. The ML version demonstrates these through Panel and classification experiments without implying Google Cloud certification.

## Completed local experiments

Compared the initial 9pt/11pt text setting with 9pt/12.2pt leading. Both compiled to one page; the selected setting moved the final text from 716.4pt to 762.5pt down the A4 page, improving page use and line separation without adding filler. The final documents retain matching page geometry.

`validation.json` records current page dimensions, extracted word counts, file sizes, and required identity/education/employment/section checks. `.txt` files show the extracted reading order. All four final pages were rendered and visually inspected. No clipping or overlapping text was observed. These tests are reproducible with `python3 resumes/validate.py`; they do not reproduce an employer's private ranking model.
