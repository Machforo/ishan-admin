import configs from '../src/config/siteConfigs';
console.log("Keys:");
console.log(Object.keys(configs));

if (configs.ayurvedic) {
  console.log("Sections in ayurvedic:", configs.ayurvedic.pages.map((p: any) => p.id).join(", "));
} else if (configs.ayurveda) {
  console.log("Sections in ayurveda:", configs.ayurveda.pages.map((p: any) => p.id).join(", "));
}
