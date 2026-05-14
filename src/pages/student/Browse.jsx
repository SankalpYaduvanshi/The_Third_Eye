import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVehicleStore } from '../../stores/vehicleStore';
import { mockVendors } from '../../mock/vendors';
import { Search, SlidersHorizontal, Bike, Car, Star, MapPin, Fuel, X, ChevronDown } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';

const Browse = () => {
  const { vehicles } = useVehicleStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredVehicles = useMemo(() => {
    let results = vehicles.filter((v) => {
      const isAvailable = v.manualOverride !== false && v.isAvailable;
      if (!isAvailable) return false;
      if (typeFilter !== 'all' && v.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!v.name.toLowerCase().includes(q) && !v.category.toLowerCase().includes(q)) return false;
      }
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (v.pricing.hourly < min || (max && v.pricing.hourly > max)) return false;
      }
      return true;
    });

    if (sortBy === 'price-low') results.sort((a, b) => a.pricing.hourly - b.pricing.hourly);
    else if (sortBy === 'price-high') results.sort((a, b) => b.pricing.hourly - a.pricing.hourly);
    else if (sortBy === 'rating') results.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'rides') results.sort((a, b) => b.totalRides - a.totalRides);

    return results;
  }, [vehicles, search, typeFilter, priceRange, sortBy]);

  const getVendor = (vendorId) => mockVendors.find((v) => v.id === vendorId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Browse Vehicles</h1>
        <p className="text-slate-500 mt-1">Find the perfect ride near your campus</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bikes, cars, scooters..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
            showFilters ? 'bg-primary-50 border-primary-200 text-primary-800' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'bike', 'car'].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              typeFilter === type
                ? 'bg-primary-800 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {type === 'bike' && <Bike size={14} />}
            {type === 'car' && <Car size={14} />}
            {type === 'all' ? 'All' : type === 'bike' ? 'Bikes' : 'Cars'}
          </button>
        ))}
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Price Range (per hour)</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/30">
                <option value="all">All prices</option>
                <option value="0-50">Under ₹50/hr</option>
                <option value="50-100">₹50 - ₹100/hr</option>
                <option value="100-200">₹100 - ₹200/hr</option>
                <option value="200-9999">₹200+/hr</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/30">
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rides">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-slate-500 mb-4">{filteredVehicles.length} vehicles available</p>

      {/* Vehicle Grid */}
      {filteredVehicles.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No vehicles found"
          description="Try adjusting your filters or search query."
          actionLabel="Clear Filters"
          onAction={() => { setSearch(''); setTypeFilter('all'); setPriceRange('all'); }}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {filteredVehicles.map((vehicle) => {
            const vendor = getVendor(vehicle.vendorId);
            return (
              <Link key={vehicle.id} to={`/vehicle/${vehicle.id}`}>
                <Card hover className="!p-0 overflow-hidden group h-full">
                  {/* Image Placeholder */}
                  <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {vehicle.type === 'bike' ? <Bike size={36} className="text-primary-600" /> : <Car size={36} className="text-primary-600" />}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge color={vehicle.type === 'bike' ? 'primary' : 'accent'} size="sm">{vehicle.category}</Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge color="success" size="sm" dot>Available</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-primary-800 transition-colors">{vehicle.name}</h3>
                      <div className="flex items-center gap-1 text-sm shrink-0 ml-2">
                        <Star size={13} className="text-accent-500 fill-accent-500" />
                        <span className="font-semibold text-slate-700">{vehicle.rating}</span>
                      </div>
                    </div>

                    {vendor && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <MapPin size={12} />
                        <span>{vendor.businessName}</span>
                        <span>•</span>
                        <span>{vendor.distance} km</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><Fuel size={12} />{vehicle.fuelType}</span>
                      <span>{vehicle.color}</span>
                      <span>{vehicle.year}</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline justify-between pt-3 border-t border-slate-50">
                      <div>
                        <span className="text-xl font-black text-primary-800">₹{vehicle.pricing.hourly}</span>
                        <span className="text-xs text-slate-500">/hr</span>
                      </div>
                      <div className="flex gap-2 text-xs text-slate-400">
                        <span>₹{vehicle.pricing.fullDay}/day</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Browse;
