import { siteConfigs } from './src/config/siteConfigs';

const ascend = siteConfigs['iimt'];
if (ascend) {
  ascend.pages.forEach(p => {
    console.log(`Page: ${p.id} - ${p.title}`);
    p.sections.forEach(s => {
      console.log(`  Section: ${s.id} - ${s.title}`);
    });
  });
}
