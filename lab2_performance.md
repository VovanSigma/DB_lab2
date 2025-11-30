Лабораторна робота №2 Пункт 5 Тестування швидкодії

Що порівнюється?

Порівнюється швидкодія роботи з даними, які представляють одну й ту саму сутність- медичний запис пацієнта

У MongoDB запис зберігається як один документ у колекції medical_records_nosql.

У PostgreSQL ці самі дані розподілені між кількома таблицями:

medical_records

medical_record_diagnoses + diagnoses

prescriptions + prescription_items + medications

Один документ NoSQL відповідає кільком рядкам у SQL-таблицях.

Сценарій 1 масова вставка медичних записів
MongoDB
var start = new Date();
db.medical_records_nosql.insertMany(bigArrayOfRecords);
var end = new Date();
print("MongoDB insertMany: " + (end - start) + " ms");

PostgreSQL
INSERT INTO medical_records (...);
INSERT INTO medical_record_diagnoses (...);
INSERT INTO prescriptions (...);
INSERT INTO prescription_items (...);

Результат

MongoDB виконує вставку швидше, тому що запис додається одним документом.
У PostgreSQL одна логічна операція вставки складається з кількох INSERT у різні таблиці, що потребує більше часу.

Сценарій 2 отримання всієї історії пацієнта
MongoDB
var start = new Date();
db.medical_records_nosql.find({ patient_id: 1 }).toArray();
var end = new Date();
print("MongoDB find: " + (end - start) + " ms");

PostgreSQL
EXPLAIN ANALYZE
SELECT mr.*,
       d.code,
       d.name,
       pi.description
FROM medical_records mr
LEFT JOIN medical_record_diagnoses mrd ON mr.id = mrd.medical_record_id
LEFT JOIN diagnoses d ON mrd.diagnosis_id = d.id
LEFT JOIN prescriptions pr ON pr.medical_record_id = mr.id
LEFT JOIN prescription_items pi ON pi.prescription_id = pr.id
WHERE mr.patient_id = 1;

Результат

MongoDB швидше виконує читання, тому що не використовує JOIN і зберігає всі дані всередині документа.
PostgreSQL виконує складний запит з кількома приєднаннями, тому потребує більше часу.

Висновок

MongoDB краще справляється зі вставкою великих масивів даних та швидким читанням документів, де структура вкладена.

PostgreSQL забезпечує цілісність даних і краще підходить для фінансових операцій, платежів, рахунків.
