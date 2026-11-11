"""Local layout and extraction checks; not an employer ATS scoring model."""
from pathlib import Path
import json, subprocess, xml.etree.ElementTree as ET
root=Path(__file__).parent
rows=[]
for pdf in sorted(root.glob('*.pdf')):
 text=subprocess.check_output(['pdftotext','-layout',str(pdf),'-'],text=True)
 (root/(pdf.stem+'.txt')).write_text(text)
 xml=subprocess.check_output(['pdftotext','-bbox',str(pdf),'-'],text=True)
 tree=ET.fromstring(xml); ns={'x':'http://www.w3.org/1999/xhtml'}
 pages=tree.findall('.//x:page',ns); words=tree.findall('.//x:word',ns)
 bounds=[float(w.attrib['yMax']) for w in words]
 required=['Sidharth Bhagat','sidharthbhagat2005@gmail.com','ICICI Bank','2027','EDUCATION','EXPERIENCE','PROJECTS','TECHNICAL SKILLS','ACHIEVEMENTS']
 missing=[s for s in required if s not in text]
 row={'file':pdf.name,'pages':len(pages),'width_pt':float(pages[0].attrib['width']),'height_pt':float(pages[0].attrib['height']),'last_text_baseline_pt':max(bounds),'bytes':pdf.stat().st_size,'missing_fields':missing,'extracted_words':len(text.split())}
 rows.append(row)
 assert len(pages)==1,row
 assert not missing,row
 assert 590<row['width_pt']<600 and 840<row['height_pt']<850,row
 assert max(bounds)<810,row
 assert pdf.stat().st_size<2500000,row
(root/'validation.json').write_text(json.dumps(rows,indent=2))
print(json.dumps(rows,indent=2))
