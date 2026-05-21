import { useState } from 'react';
import { useVendorStore } from '../../stores/vendorStore';
import { mockGeofenceAlerts } from '../../mock/analytics';
import { AlertTriangle, CheckCircle, X, MapPin, Clock, Bell, Filter, Bike, Car } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

const GeofenceAlerts = () => {
  const { geofenceAlerts, acknowledgeAlert, dismissAlert } = useVendorStore();
  const [filter, setFilter] = useState('all'); // all, active, acknowledged, dismissed

  // Combine store alerts with mock data for demo
  const allAlerts = [...geofenceAlerts, ...mockGeofenceAlerts].reduce((acc, a) => {
    if (!acc.find((x) => x.id === a.id)) acc.push(a);
    return acc;
  }, []);

  const [localAlerts, setLocalAlerts] = useState(allAlerts.map((a) => ({
    ...a,
    localStatus: a.status || 'active',
  })));

  const filtered = localAlerts.filter((a) => {
    if (filter === 'all') return true;
    return a.localStatus === filter;
  });

  const handleAcknowledge = (id) => {
    setLocalAlerts((prev) => prev.map((a) => a.id === id ? { ...a, localStatus: 'acknowledged' } : a));
    acknowledgeAlert(id);
  };

  const handleDismiss = (id) => {
    setLocalAlerts((prev) => prev.map((a) => a.id === id ? { ...a, localStatus: 'dismissed' } : a));
    dismissAlert(id);
  };

  const severityConfig = {
    high: { color: 'error', bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-500' },
    medium: { color: 'warning', bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500' },
    low: { color: 'primary', bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500' },
  };

  const activeCount = localAlerts.filter((a) => a.localStatus === 'active').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Geofence Alerts
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold animate-bounce-subtle">
                {activeCount}
              </span>
            )}
          </h1>
          <p className="text-slate-500 text-sm">Monitor vehicles leaving designated zones</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6 w-fit">
        {[
          { key: 'all', label: 'All', count: localAlerts.length },
          { key: 'active', label: 'Active', count: localAlerts.filter((a) => a.localStatus === 'active').length },
          { key: 'acknowledged', label: 'Acknowledged', count: localAlerts.filter((a) => a.localStatus === 'acknowledged').length },
          { key: 'dismissed', label: 'Dismissed', count: localAlerts.filter((a) => a.localStatus === 'dismissed').length },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              filter === t.key ? 'bg-white text-primary-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                filter === t.key ? 'bg-primary-100 text-primary-700' : 'bg-slate-200 text-slate-500'
              }`}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 rounded-xl bg-primary-50 border border-primary-100">
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-primary-700 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-primary-800">How Geofencing Works</p>
            <p className="text-xs text-primary-600 mt-0.5">
              Vehicles are tracked during active rides. When a student drives beyond the designated zone boundary,
              an alert is triggered. You can acknowledge alerts to mark them reviewed, or dismiss false positives.
            </p>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No alerts"
          description={filter === 'all' ? 'No geofence alerts have been triggered.' : `No ${filter} alerts.`}
        />
      ) : (
        <div className="space-y-3 stagger-children">
          {filtered.map((alert) => {
            const sev = severityConfig[alert.severity] || severityConfig.medium;
            return (
              <Card key={alert.id} className={`!p-0 overflow-hidden border ${sev.border} ${alert.localStatus !== 'active' ? 'opacity-60' : ''}`}>
                <div className="flex flex-col sm:flex-row">
                  {/* Severity Strip */}
                  <div className={`sm:w-1.5 h-1.5 sm:h-auto ${
                    alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />

                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${sev.bg} flex items-center justify-center shrink-0`}>
                        <AlertTriangle size={18} className={sev.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-slate-900 text-sm">{alert.message}</h3>
                          <Badge color={sev.color} size="sm">{alert.severity}</Badge>
                          {alert.localStatus === 'acknowledged' && <Badge color="success" size="sm">Acknowledged</Badge>}
                          {alert.localStatus === 'dismissed' && <Badge color="neutral" size="sm">Dismissed</Badge>}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                          <span className="flex items-center gap-1">
                            {alert.vehicleType === 'car' ? <Car size={11} /> : <Bike size={11} />}
                            {alert.vehicleName || 'Vehicle'}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {alert.location || 'Unknown location'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {alert.timestamp ? new Date(alert.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : 'Just now'}
                          </span>
                          {alert.distance && (
                            <span className="font-medium text-red-600">{alert.distance} km outside zone</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {alert.localStatus === 'active' && (
                    <div className="flex sm:flex-col gap-2 p-4 sm:p-5 sm:border-l border-t sm:border-t-0 border-slate-100 bg-slate-50/50 sm:w-40 justify-center">
                      <Button size="sm" fullWidth onClick={() => handleAcknowledge(alert.id)} icon={CheckCircle}>
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="ghost" fullWidth onClick={() => handleDismiss(alert.id)} icon={X}>
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GeofenceAlerts;
