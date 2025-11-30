-- Приклад збереження медичного запису в SQL-таблиці medical_records
-- (таблиця оголошена у файлі hospital_schema.sql)

INSERT INTO medical_records (
    admission_id,
    appointment_id,
    patient_id,
    doctor_id,
    record_datetime,
    description,
    created_at
) VALUES (
    NULL,              -- немає госпіталізації, це амбулаторний прийом
    10,                -- ID прийому 
    1,                 -- patient_id
    1,                 -- doctor_id
    '2025-11-30 10:15:00',
    'Скарги на біль у горлі, температура 38.2',
    NOW()
);

-- Приклад другого запису 
INSERT INTO medical_records (
    admission_id,
    appointment_id,
    patient_id,
    doctor_id,
    record_datetime,
    description,
    created_at
) VALUES (
    5,                 -- ID госпіталізації 
    NULL,              -- немає окремого прийому
    1,
    2,
    '2025-12-01 09:00:00',
    'Пацієнт госпіталізований зі скаргами на біль у грудях',
    NOW()
);

-- Вибір усіх медичних записів по пацієнту 
SELECT *
FROM medical_records
WHERE patient_id = 1
  AND is_deleted = FALSE;
