import configs from '../src/config/siteConfigs';
const ayurveda = configs.ayurveda;
const sz = ayurveda.pages.find((p: any) => p.id === 'student_zone');
console.log(JSON.stringify(sz, null, 2));
