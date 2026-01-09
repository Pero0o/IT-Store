// ======== General Helpers ========
function saveDevice(item) {
  const data = JSON.parse(localStorage.getItem('itstore_devices') || '[]');
  data.push(item);
  localStorage.setItem('itstore_devices', JSON.stringify(data));
}

function getDevices() {
  return JSON.parse(localStorage.getItem('itstore_devices') || '[]');
}

// ======== Add Device Page ========
document.addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('addDeviceForm');
  if (addForm) {
    addForm.addEventListener('submit', e => {
      e.preventDefault();
      const item = {
        deviceType: document.getElementById('deviceType')?.value || '',
        brand: document.getElementById('brand')?.value || '',
        model: document.getElementById('model')?.value || '',
        serial: document.getElementById('serial')?.value || '',
        mac: document.getElementById('mac')?.value || '',
        status: document.getElementById('status')?.value || '',
        enteredBy: document.getElementById('enteredBy')?.value || '',
        timestamp: new Date().toLocaleString()
      };
      saveDevice(item);
      alert('Device added successfully!');
      addForm.reset();
    });
  }

  // ======== Store Page ========
  const storeRows = document.getElementById('storeRows');
  if (storeRows) {
    const renderStore = () => {
      const devices = getDevices();
      storeRows.innerHTML = '';
      if (devices.length === 0) {
        storeRows.innerHTML = '<tr><td colspan="8" class="empty">No devices stored yet.</td></tr>';
        return;
      }
      devices.forEach(d => {
        storeRows.innerHTML += `
          <tr>
            <td>${d.deviceType}</td>
            <td>${d.brand}</td>
            <td>${d.model}</td>
            <td>${d.serial}</td>
            <td>${d.mac}</td>
            <td>${d.status}</td>
            <td>${d.enteredBy}</td>
            <td>${d.timestamp}</td>
          </tr>
        `;
      });
    };
    renderStore();
  }

  // ======== Delivery Page ========
  const deliveryForm = document.getElementById('deliveryForm');
  const deliveryRows = document.getElementById('deliveryRows');
  const deliveries = JSON.parse(localStorage.getItem('itstore_deliveries') || '[]');

  const renderDeliveries = () => {
    if (!deliveryRows) return;
    deliveryRows.innerHTML = '';
    if (deliveries.length === 0) {
      deliveryRows.innerHTML = '<tr><td colspan="6" class="empty">No delivery records yet.</td></tr>';
      return;
    }
    deliveries.forEach(d => {
      deliveryRows.innerHTML += `
        <tr>
          <td>${d.deliveryTo || ''}</td>
          <td>${d.deliveryDate || ''}</td>
          <td>${d.deviceSerial || ''}</td>
          <td>${d.condition || ''}</td>
          <td>${d.deliveredBy || ''}</td>
          <td>${d.notes || ''}</td>
        </tr>
      `;
    });
  };
  renderDeliveries();

  if (deliveryForm) {
    deliveryForm.addEventListener('submit', e => {
      e.preventDefault();
      const delivery = {
        deliveryTo: document.getElementById('deliveryTo')?.value || '',
        deliveryDate: document.getElementById('deliveryDate')?.value || '',
        deviceSerial: document.getElementById('deviceSerial')?.value || '',
        condition: document.getElementById('condition')?.value || '',
        deliveredBy: document.getElementById('deliveredBy')?.value || '',
        notes: document.getElementById('notes')?.value || ''
      };
      deliveries.push(delivery);
      localStorage.setItem('itstore_deliveries', JSON.stringify(deliveries));
      renderDeliveries();
      deliveryForm.reset();
    });

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => deliveryForm.reset());
  }

  // ======== Replace Page ========
  const replaceForm = document.getElementById('replaceForm');
  const replaceRows = document.getElementById('replaceRows');
  const replacements = JSON.parse(localStorage.getItem('itstore_replacements') || '[]');

  const renderReplacements = () => {
    if (!replaceRows) return;
    replaceRows.innerHTML = '';
    if (replacements.length === 0) {
      replaceRows.innerHTML = '<tr><td colspan="6" class="empty">No replacement records yet.</td></tr>';
      return;
    }
    replacements.forEach(r => {
      replaceRows.innerHTML += `
        <tr>
          <td>${r.oldSerial || ''}</td>
          <td>${r.newDeviceType || ''}</td>
          <td>${r.newBrand || ''}</td>
          <td>${r.newModel || ''}</td>
          <td>${r.replacementDate || ''}</td>
          <td>${r.replaceBy || ''}</td>
        </tr>
      `;
    });
  };
  renderReplacements();

  if (replaceForm) {
    replaceForm.addEventListener('submit', e => {
      e.preventDefault();
      const item = {
        oldSerial: document.getElementById('oldSerial')?.value || '',
        newDeviceType: document.getElementById('newDeviceType')?.value || '',
        newBrand: document.getElementById('newBrand')?.value || '',
        newModel: document.getElementById('newModel')?.value || '',
        replacementDate: document.getElementById('replacementDate')?.value || '',
        replaceBy: document.getElementById('replaceBy')?.value || ''
      };
      replacements.push(item);
      localStorage.setItem('itstore_replacements', JSON.stringify(replacements));
      renderReplacements();
      replaceForm.reset();
    });

    const clearReplace = document.getElementById('clearReplace');
    if (clearReplace) clearReplace.addEventListener('click', () => replaceForm.reset());
  }
});
