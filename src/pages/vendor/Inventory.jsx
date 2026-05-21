import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useAuthStore } from '../../stores/authStore';
import { Search, Plus, Bike, Car, Star, Fuel, ToggleLeft, ToggleRight, Pencil, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';

const Inventory = () => {
  const { user } = useAuthStore();
  const { vehicles, toggleAvailability, removeVehicle } = useVehicleStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const vendorVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Show all vehicles for demo (in real app, filter by v.vendorId === user?.id)
      if (search) {
        const q = search.toLowerCase();
        if (!v.name.toLowerCase().includes(q) && !v.category.toLowerCase().includes(q)) return false;
      }
      if (typeFilter !== 'all' && v.type !== typeFilter) return false;
      if (statusFilter === 'available' && (!v.isAvailable || v.manualOverride === false)) return false;
      if (statusFilter === 'unavailable' && v.isAvailable && v.manualOverride !== false) return false;
      return true;
    });
  }, [vehicles, search, typeFilter, statusFilter]);

  const handleDelete = () => {
    if (deleteId) {
      removeVehicle(deleteId);
      setDeleteId(null);
    }
  };

  const isAvailable = (v) => v.isAvailable && v.manualOverride !== false;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Inventory</h1>
          <p className="text-slate-500 text-sm">{vendorVehicles.length} vehicles</p>
        </div>
        <Link to="/vendor/vehicle/new">
          <Button variant="accent" icon={Plus}>Add Vehicle</Button>
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vehicles..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'bike', 'car'].map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${typeFilter === t ? 'bg-primary-800 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            {t === 'all' ? 'All Types' : t === 'bike' ? '🏍️ Bikes' : '🚗 Cars'}
          </button>
        ))}
        <div className="w-px bg-slate-200 mx-1" />
        {['all', 'available', 'unavailable'].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${statusFilter === s ? 'bg-primary-800 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            {s === 'all' ? 'All Status' : s === 'available' ? '✅ Available' : '❌ Unavailable'}
          </button>
        ))}
      </div>

      {/* Vehicle Grid */}
      {vendorVehicles.length === 0 ? (
        <EmptyState icon={Bike} title="No vehicles found" description="Add your first vehicle to start receiving bookings." actionLabel="Add Vehicle" onAction={() => {}} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {vendorVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="!p-0 overflow-hidden">
              {/* Header */}
              <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  {vehicle.type === 'bike' ? <Bike size={28} className="text-primary-600" /> : <Car size={28} className="text-primary-600" />}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge color={vehicle.type === 'bike' ? 'primary' : 'accent'} size="sm">{vehicle.category}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge color={isAvailable(vehicle) ? 'success' : 'error'} size="sm" dot>
                    {isAvailable(vehicle) ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-1">{vehicle.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1"><Fuel size={11} />{vehicle.fuelType}</span>
                  <span>•</span>
                  <span>{vehicle.year}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><Star size={11} className="text-accent-500 fill-accent-500" />{vehicle.rating}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-center">
                    <span className="text-slate-500">Hourly</span>
                    <p className="font-bold text-slate-900">₹{vehicle.pricing.hourly}</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg text-center">
                    <span className="text-slate-500">Full Day</span>
                    <p className="font-bold text-slate-900">₹{vehicle.pricing.fullDay}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleAvailability(vehicle.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer hover:bg-slate-50" title="Toggle availability">
                    {isAvailable(vehicle) ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} className="text-slate-400" />}
                    <span className={isAvailable(vehicle) ? 'text-green-600' : 'text-slate-500'}>
                      {isAvailable(vehicle) ? 'On' : 'Off'}
                    </span>
                  </button>
                  <div className="flex-1" />
                  <Link to={`/vendor/vehicle/${vehicle.id}/edit`}>
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                      <Pencil size={15} />
                    </button>
                  </Link>
                  <button onClick={() => setDeleteId(vehicle.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Vehicle" size="sm">
        <p className="text-sm text-slate-600 mb-6">Are you sure you want to remove this vehicle? This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="ghost" fullWidth onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" fullWidth onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Inventory;
