export const SECTION_TEMPLATES = [
  {
    name: 'Hero Section',
    html: `<section class="py-20 bg-slate-50">
  <div class="max-w-7xl mx-auto px-6 text-center">
    <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Welcome to Our Platform</h1>
    <p class="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Discover the best way to manage your business with our cutting-edge solutions.</p>
    <div class="flex justify-center gap-4">
      <a href="#" class="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition">Get Started</a>
      <a href="#" class="px-8 py-3 bg-white text-blue-600 font-bold rounded-full border border-blue-200 hover:bg-slate-50 transition">Learn More</a>
    </div>
  </div>
</section>`
  },
  {
    name: 'Features Grid',
    html: `<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">Our Features</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-2xl">🚀</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Fast Performance</h3>
        <p class="text-slate-600">Experience lightning-fast speeds and optimized performance across all platforms.</p>
      </div>
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4 text-2xl">🔒</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Secure</h3>
        <p class="text-slate-600">Top-tier security to ensure your data is always protected and private.</p>
      </div>
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4 text-2xl">💡</div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Innovative</h3>
        <p class="text-slate-600">Constantly updating with the latest features and modern technologies.</p>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'Call to Action (CTA)',
    html: `<section class="py-16 bg-blue-600">
  <div class="max-w-5xl mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold text-white mb-6">Ready to transform your workflow?</h2>
    <p class="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">Join thousands of satisfied users who are already experiencing the difference.</p>
    <a href="#" class="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-50 transition shadow-lg">Start Your Free Trial</a>
  </div>
</section>`
  },
  {
    name: 'Testimonials',
    html: `<section class="py-16 bg-slate-50">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">What Our Clients Say</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex text-amber-400 mb-4 text-xl">★★★★★</div>
        <p class="text-slate-700 italic mb-6">"This platform has completely changed how we operate. It's intuitive, fast, and exactly what we needed."</p>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div>
            <h4 class="font-bold text-slate-900">Sarah Johnson</h4>
            <p class="text-sm text-slate-500">CEO, TechCorp</p>
          </div>
        </div>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex text-amber-400 mb-4 text-xl">★★★★★</div>
        <p class="text-slate-700 italic mb-6">"Incredible customer support and robust features. Highly recommended for any growing business."</p>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div>
            <h4 class="font-bold text-slate-900">Michael Chen</h4>
            <p class="text-sm text-slate-500">Director, Startup Inc</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'Statistics / Numbers',
    html: `<section class="py-16 bg-white border-y border-slate-100">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <div class="text-4xl font-black text-blue-600 mb-2">10K+</div>
        <div class="text-slate-500 font-medium">Active Users</div>
      </div>
      <div>
        <div class="text-4xl font-black text-emerald-600 mb-2">99.9%</div>
        <div class="text-slate-500 font-medium">Uptime</div>
      </div>
      <div>
        <div class="text-4xl font-black text-amber-500 mb-2">50+</div>
        <div class="text-slate-500 font-medium">Integrations</div>
      </div>
      <div>
        <div class="text-4xl font-black text-rose-500 mb-2">24/7</div>
        <div class="text-slate-500 font-medium">Support</div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'FAQ Accordion',
    html: `<section class="py-16 bg-slate-50">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-center text-slate-900 mb-10">Frequently Asked Questions</h2>
    <div class="space-y-4">
      <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 class="font-bold text-slate-900 text-lg mb-2">How do I get started?</h3>
        <p class="text-slate-600">Simply sign up for an account and follow the onboarding process. It takes less than 5 minutes.</p>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 class="font-bold text-slate-900 text-lg mb-2">Can I cancel my subscription?</h3>
        <p class="text-slate-600">Yes, you can cancel your subscription at any time from your account settings without any hidden fees.</p>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 class="font-bold text-slate-900 text-lg mb-2">Do you offer customer support?</h3>
        <p class="text-slate-600">We offer 24/7 email support for all users, and live chat support for premium subscribers.</p>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'Newsletter Signup',
    html: `<section class="py-16 bg-slate-900">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
    <p class="text-slate-400 mb-8">Get the latest updates, articles, and resources straight to your inbox.</p>
    <form class="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
      <input type="email" placeholder="Enter your email" class="flex-1 px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-blue-500" required>
      <button type="submit" class="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition">Subscribe</button>
    </form>
  </div>
</section>`
  },
  {
    name: 'Image Text Split',
    html: `<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
    <div class="flex-1">
      <div class="aspect-video bg-slate-200 rounded-2xl overflow-hidden shadow-lg">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team" class="w-full h-full object-cover">
      </div>
    </div>
    <div class="flex-1 space-y-6">
      <div class="text-sm font-bold text-blue-600 tracking-wider uppercase">About Us</div>
      <h2 class="text-3xl font-bold text-slate-900">Dedicated to Your Success</h2>
      <p class="text-slate-600 leading-relaxed text-lg">We build innovative solutions designed to empower your business. Our team works tirelessly to ensure you have the best tools at your disposal.</p>
      <ul class="space-y-3">
        <li class="flex items-center gap-3 text-slate-700"><span class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span> Reliable Service</li>
        <li class="flex items-center gap-3 text-slate-700"><span class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span> Expert Team</li>
        <li class="flex items-center gap-3 text-slate-700"><span class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</span> 24/7 Support</li>
      </ul>
    </div>
  </div>
</section>`
  },
  {
    name: 'Team Profiles',
    html: `<section class="py-16 bg-slate-50">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">Meet Our Team</h2>
    <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="w-32 h-32 mx-auto bg-slate-200 rounded-full mb-4 shadow-sm overflow-hidden"><img src="https://ui-avatars.com/api/?name=John+Doe&background=random" class="w-full h-full object-cover"></div>
        <h3 class="font-bold text-slate-900 text-lg">John Doe</h3>
        <p class="text-slate-500 text-sm">CEO & Founder</p>
      </div>
      <div class="text-center">
        <div class="w-32 h-32 mx-auto bg-slate-200 rounded-full mb-4 shadow-sm overflow-hidden"><img src="https://ui-avatars.com/api/?name=Jane+Smith&background=random" class="w-full h-full object-cover"></div>
        <h3 class="font-bold text-slate-900 text-lg">Jane Smith</h3>
        <p class="text-slate-500 text-sm">CTO</p>
      </div>
      <div class="text-center">
        <div class="w-32 h-32 mx-auto bg-slate-200 rounded-full mb-4 shadow-sm overflow-hidden"><img src="https://ui-avatars.com/api/?name=Mike+Johnson&background=random" class="w-full h-full object-cover"></div>
        <h3 class="font-bold text-slate-900 text-lg">Mike Johnson</h3>
        <p class="text-slate-500 text-sm">Lead Designer</p>
      </div>
      <div class="text-center">
        <div class="w-32 h-32 mx-auto bg-slate-200 rounded-full mb-4 shadow-sm overflow-hidden"><img src="https://ui-avatars.com/api/?name=Sarah+Williams&background=random" class="w-full h-full object-cover"></div>
        <h3 class="font-bold text-slate-900 text-lg">Sarah Williams</h3>
        <p class="text-slate-500 text-sm">Head of Marketing</p>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'Pricing Table',
    html: `<section class="py-16 bg-white">
  <div class="max-w-5xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">Simple, Transparent Pricing</h2>
    <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
      <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
        <h3 class="text-xl font-bold text-slate-900 mb-2">Basic</h3>
        <div class="text-4xl font-black text-slate-900 mb-6">$19<span class="text-lg text-slate-500 font-normal">/mo</span></div>
        <ul class="space-y-4 mb-8 text-slate-600">
          <li>1 User Account</li>
          <li>10GB Storage</li>
          <li>Basic Support</li>
        </ul>
        <a href="#" class="block w-full py-3 px-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition">Choose Basic</a>
      </div>
      <div class="bg-blue-600 p-8 rounded-3xl text-center shadow-xl transform md:-translate-y-4">
        <div class="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Most Popular</div>
        <h3 class="text-xl font-bold text-white mb-2">Pro</h3>
        <div class="text-4xl font-black text-white mb-6">$49<span class="text-lg text-blue-200 font-normal">/mo</span></div>
        <ul class="space-y-4 mb-8 text-blue-50">
          <li>Unlimited Users</li>
          <li>100GB Storage</li>
          <li>Priority Support</li>
          <li>Advanced Analytics</li>
        </ul>
        <a href="#" class="block w-full py-3 px-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition shadow-sm">Choose Pro</a>
      </div>
    </div>
  </div>
</section>`
  }
];
