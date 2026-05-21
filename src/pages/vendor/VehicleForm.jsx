import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useAuthStore } from '../../stores/authStore';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getVehicleById, addVehicle, editVehicle } = useVehicleStore();

  const isEdit = !!id;
  const existing = isEdit ? getVehicleById(id) : null;

  const [form, setForm] = useState({
    name: existing?.name || '',
    type: existing?.type || 'bike',
    category: existing?.category || '',
    year: existing?.year || 2024,
    color: existing?.color || '',
    fuelType: existing?.fuelType || 'Petrol',
    mileage: existing?.mileage || '',
    condition: existing?.condition || 4,
    deposit: existing?.deposit || 500,
    hourly: existing?.pricing?.hourly || '',
    halfDay: existing?.pricing?.halfDay || '',
    fullDay: existing?.pricing?.fullDay || '',
    perKm: existing?.pricing?.perKm || '',
  });

  const [features, setFeatures] = useState(existing?.features || ['Helmet included']);
  const [newFeature, setNewFeature] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (f) => setFeatures(features.filter((x) => x !== f));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));

    const vehicleData = {
      vendorId: user?.id || 'v1',
      name: form.name,
      type: form.type,
      category: form.category,
      year: Number(form.year),
      color: form.color,
      fuelType: form.fuelType,
      mileage: form.mileage,
      condition: Number(form.condition),
      deposit: Number(form.deposit),
      photos: [],
      pricing: {
        hourly: Number(form.hourly),
        halfDay: Number(form.halfDay),
        fullDay: Number(form.fullDay),
        perKm: Number(form.perKm),
      },
      features,
    };

    if (isEdit) {
      editVehicle(id, vehicleData);
    } else {
      addVehicle(vehicleData);
    }

    setSaving(false);
    navigate('/vendor/inventory');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 cursor-pointer transition-colors">
        <ArrowLeft size={16} /> Back to Inventory
      </button>

      <h1 className="text-2xl font-black text-slate-900 mb-6">{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <Card.Header><Card.Title>Basic Information</Card.Title></Card.Header>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Vehicle Name" name="name" value={form.name} onChange={handleChange} placeholder="Honda Activa 6G" required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-[var(--radius-md)] border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer">
                <option value="bike">Bike / Scooter</option>
                <option value="car">Car</option>
              </select>
            </div>
            <Input label="Category" name="category" value={form.category} onChange={handleChange} placeholder="Scooter, Cruiser, SUV..." />
            <Input label="Year" name="year" type="number" value={form.year} onChange={handleChange} />
            <Input label="Color" name="color" value={form.color} onChange={handleChange} placeholder="Matte Grey" />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Fuel Type</label>
              <select name="fuelType" value={form.fuelType} onChange={handleChange} className="w-full rounded-[var(--radius-md)] border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <Input label="Mileage" name="mileage" value={form.mileage} onChange={handleChange} placeholder="50 km/l" />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Condition (1-5)</label>
              <select name="condition" value={form.condition} onChange={handleChange} className="w-full rounded-[var(--radius-md)] border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer">
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} — {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][n - 1]}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card>
          <Card.Header><Card.Title>Pricing</Card.Title></Card.Header>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input label="Hourly (₹)" name="hourly" type="number" value={form.hourly} onChange={handleChange} placeholder="40" />
            <Input label="Half Day (₹)" name="halfDay" type="number" value={form.halfDay} onChange={handleChange} placeholder="150" />
            <Input label="Full Day (₹)" name="fullDay" type="number" value={form.fullDay} onChange={handleChange} placeholder="250" />
            <Input label="Per KM (₹)" name="perKm" type="number" value={form.perKm} onChange={handleChange} placeholder="5" />
          </div>
          <div className="mt-4">
            <Input label="Security Deposit (₹)" name="deposit" type="number" value={form.deposit} onChange={handleChange} placeholder="500" />
          </div>
        </Card>

        {/* Features */}
        <Card>
          <Card.Header><Card.Title>Features</Card.Title></Card.Header>
          <div className="flex flex-wrap gap-2 mb-3">
            {features.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-800 rounded-full text-xs font-medium">
                {f}
                <button type="button" onClick={() => removeFeature(f)} className="hover:text-red-500 cursor-pointer"><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="Add a feature..." className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" />
            <Button type="button" variant="outline" onClick={addFeature} icon={Plus} size="sm">Add</Button>
          </div>
        </Card>

        {/* Photos */}
        <Card>
          <Card.Header><Card.Title>Photos</Card.Title></Card.Header>
          <div className="border-2 border-dashed rounded-xl p-8 text-center border-slate-200 cursor-pointer hover:border-primary-500 hover:bg-primary-50/30 transition-all">
            <Upload size={32} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Click to upload vehicle photos</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 5MB each</p>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="button" variant="outline" fullWidth onClick={() => navigate('/vendor/inventory')}>Cancel</Button>
          <Button type="submit" fullWidth loading={saving}>{isEdit ? 'Save Changes' : 'Add Vehicle'}</Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
