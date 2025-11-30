// Вставка медичного запису для пацієнта в MongoDB
db.medical_records_nosql.insertOne({
  patient_id: 1,
  doctor_id: 1,
  created_at: ISODate("2025-11-30T10:15:00Z"),
  source: "appointment",          // запис пов'язаний з прийомом
  source_id: 10,                  // ID прийому в SQL
  text: "Скарги на біль у горлі, температура 38.2",
  diagnoses: [
    { code: "J02", name: "Гострий фарингіт" }
  ],
  prescriptions: [
    {
      medication: "Парацетамол",
      dosage: "500 мг",
      frequency: "3 рази на день",
      duration_days: 3
    }
  ],
  extra: {
    temperature: 38.2,
    notes: "Рекомендовано рясне пиття та постільний режим"
  }
});

// Ще один запис для цього ж пацієнта, але вже госпіталізація
db.medical_records_nosql.insertOne({
  patient_id: 1,
  doctor_id: 2,
  created_at: ISODate("2025-12-01T09:00:00Z"),
  source: "admission",            // запис прив'язаний до госпіталізації
  source_id: 5,                   // ID госпіталізації в SQL
  text: "Пацієнт госпіталізований зі скаргами на біль у грудях",
  diagnoses: [
    { code: "I20", name: "Стенокардія" }
  ],
  prescriptions: [
    {
      medication: "Нітрогліцерин",
      dosage: "1 табл.",
      frequency: "за потреби",
      duration_days: 7
    }
  ],
  extra: {
    blood_pressure: "130/80",
    pulse: 78
  }
});

// Отримати всі записи конкретного пацієнта
db.medical_records_nosql.find({ patient_id: 1 });
