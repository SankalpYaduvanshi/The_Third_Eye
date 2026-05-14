import { Link } from 'react-router-dom';
import { ArrowRight, Bike, Car, Shield, Clock, MapPin, Star, Zap, Users, CreditCard } from 'lucide-react';
import Button from '../../components/ui/Button';

const Landing = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500 rounded-full blur-3xl animate-bounce-subtle" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-bounce-subtle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-400 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
                <Zap size={14} className="text-accent-400" />
                <span>Rent bikes & cars near your college</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Your Ride,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
                  Your Rules.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-lg leading-relaxed">
                The Third Wheel is the hyperlocal vehicle rental platform built for college students.
                Find bikes and cars near campus, book in seconds, and hit the road.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/signup">
                  <Button variant="accent" size="lg" iconRight={ArrowRight}>
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="ghost" size="lg" className="!text-white hover:!bg-white/10 border border-white/20">
                    Browse Vehicles
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-primary-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['A', 'M', 'R', 'S'].map((letter, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-xs font-bold text-white border-2 border-primary-800">
                        {letter}
                      </div>
                    ))}
                  </div>
                  <span>2,500+ students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-accent-400 fill-accent-400" />
                  <span>4.8 rating</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-500/30 to-primary-400/30 blur-2xl" />
                {/* Main card */}
                <div className="absolute inset-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-accent-500 flex items-center justify-center">
                        <Bike size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">Honda Activa 6G</p>
                        <p className="text-primary-200 text-sm">SpeedWheels Rentals</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Hourly', value: '₹40' },
                        { label: 'Half Day', value: '₹150' },
                        { label: 'Full Day', value: '₹250' },
                        { label: 'Per KM', value: '₹5' },
                      ].map((item) => (
                        <div key={item.label} className="bg-white/10 rounded-xl p-3 text-center">
                          <p className="text-primary-200 text-xs">{item.label}</p>
                          <p className="text-white font-bold text-lg">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="mt-6 w-full py-3 bg-accent-500 rounded-xl text-white font-bold text-sm hover:bg-accent-600 transition-colors cursor-pointer">
                    Book Now →
                  </button>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 px-3 py-1.5 bg-success rounded-full text-white text-xs font-bold shadow-lg animate-bounce-subtle">
                  Available ✓
                </div>
                <div className="absolute -bottom-2 -left-2 px-3 py-1.5 bg-white rounded-full text-primary-800 text-xs font-bold shadow-lg flex items-center gap-1.5 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                  <Star size={12} className="text-accent-500 fill-accent-500" />
                  4.7 rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent-500 font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Three Steps to Your Ride
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                step: '01',
                icon: MapPin,
                title: 'Find Nearby Vehicles',
                description: 'Browse rental shops near your college. Filter by vehicle type, price, and distance to find the perfect ride.',
                color: 'from-primary-800 to-primary-600',
              },
              {
                step: '02',
                icon: CreditCard,
                title: 'Book Instantly',
                description: 'Choose your pricing model — hourly, half-day, full-day, or per-km. Confirm your booking and get an OTP for pickup.',
                color: 'from-accent-500 to-accent-600',
              },
              {
                step: '03',
                icon: Bike,
                title: 'Ride & Return',
                description: 'Pick up your vehicle using the OTP. Track your ride in real time. Return when done and pay seamlessly.',
                color: 'from-green-500 to-green-600',
              },
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon size={24} className="text-white" />
                  </div>
                  <div className="text-5xl font-black text-slate-100 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent-500 font-semibold text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Built for College Students
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {[
              { icon: Shield, title: 'Verified Vendors', desc: 'Every rental shop is verified. Safety first, always.', color: 'bg-blue-50 text-primary-800' },
              { icon: Clock, title: 'Flexible Pricing', desc: 'Pay hourly, half-day, full-day, or per-km. Your ride, your budget.', color: 'bg-orange-50 text-accent-600' },
              { icon: MapPin, title: 'Hyperlocal', desc: 'Shops within walking distance of your campus. No long commutes.', color: 'bg-green-50 text-green-600' },
              { icon: Star, title: 'Loyalty Rewards', desc: 'Earn points on every ride. Unlock Silver, Gold, and Platinum tiers.', color: 'bg-purple-50 text-purple-600' },
              { icon: Users, title: 'Refer & Earn', desc: 'Share your referral code and both you and your friend earn points.', color: 'bg-pink-50 text-pink-600' },
              { icon: Car, title: 'Cars & Bikes', desc: 'From scooters to SUVs — find the right vehicle for every occasion.', color: 'bg-amber-50 text-amber-600' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-0.5">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white stagger-children">
            {[
              { value: '2,500+', label: 'Active Students' },
              { value: '150+', label: 'Vehicles Listed' },
              { value: '40+', label: 'Verified Vendors' },
              { value: '10,000+', label: 'Rides Completed' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-black text-accent-400">{stat.value}</p>
                <p className="text-primary-200 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Own a Rental Shop?
          </h2>
          <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
            Join The Third Wheel as a vendor. Manage your fleet, track earnings,
            and reach thousands of college students looking for rides.
          </p>
          <Link to="/vendor/signup">
            <Button variant="accent" size="lg" iconRight={ArrowRight}>
              Register as Vendor
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <Bike size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold text-white">
                  The Third <span className="text-accent-500">Wheel</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Hyperlocal vehicle rentals for college students. Find, book, and ride — all near your campus.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Students</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/browse" className="hover:text-white transition-colors">Browse Vehicles</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Log In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Vendors</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/vendor/signup" className="hover:text-white transition-colors">Register Shop</Link></li>
                <li><Link to="/vendor/login" className="hover:text-white transition-colors">Vendor Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs">
            <p>© {new Date().getFullYear()} The Third Wheel. Made with ❤️ for college students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
