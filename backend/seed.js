const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('PostgreSQL connected for enhanced seeding');

  // Clear existing items
  await prisma.vitals.deleteMany({});
  await prisma.staff.deleteMany({});
  await prisma.patient.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password123', salt);

  // --- SEED STAFF ---
  const doctor1 = await prisma.staff.create({
    data: { name: 'Dr. Jane Smith', email: 'doctor@hospital.com', password, role: 'Doctor' }
  });

  const doctor2 = await prisma.staff.create({
    data: { name: 'Dr. Alan Grant', email: 'agrant@hospital.com', password, role: 'Doctor' }
  });

  const nurse1 = await prisma.staff.create({
    data: { name: 'Nurse Joy', email: 'nurse@hospital.com', password, role: 'Nurse' }
  });

  // --- SEED PATIENTS ---
  const patientsData = [
    {
      id: 'PATIENT-12345',
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      password,
      bloodGroup: 'O+',
      edd: new Date('2026-08-15'),
      emergencyContact: 'John Connor: 555-0199'
    },
    {
      id: 'PATIENT-67890',
      name: 'Elena Gilbert',
      email: 'elena@mysticfalls.com',
      password,
      bloodGroup: 'A-',
      edd: new Date('2026-06-20'),
      emergencyContact: 'Stefan Salvatore: 555-0100'
    },
    {
      id: 'PATIENT-11223',
      name: 'Lois Lane',
      email: 'lois@dailyplanet.com',
      password,
      bloodGroup: 'B+',
      edd: new Date('2026-09-05'),
      emergencyContact: 'Clark Kent: 555-9999'
    },
    {
      id: 'PATIENT-44556',
      name: 'Mary Jane Watson',
      email: 'mj@oscorp.com',
      password,
      bloodGroup: 'O-',
      edd: new Date('2026-07-12'),
      emergencyContact: 'Peter Parker: 555-0444'
    },
    {
      id: 'PATIENT-99887',
      name: 'Peggy Carter',
      email: 'peggy@shield.gov',
      password,
      bloodGroup: 'AB+',
      edd: new Date('2026-05-30'),
      emergencyContact: 'Steve Rogers: 555-1945'
    }
  ];

  const createdPatients = [];
  for (const p of patientsData) {
    const patient = await prisma.patient.create({ data: p });
    createdPatients.push(patient);
  }

  // --- SEED VITALS HISTORY ---
  // Adding history for the first 3 patients
  const historicalVitals = [
    // Sarah's History (Healthy Trend)
    { patientId: 'PATIENT-12345', recordedById: nurse1.id, bloodPressure: '110/70', weight: 62.5, fetalHeartRate: 142, docNotes: null },
    { patientId: 'PATIENT-12345', recordedById: doctor1.id, bloodPressure: '120/80', weight: 64.0, fetalHeartRate: 145, docNotes: 'Patient progress is excellent. Standard follow-up scheduled.' },
    
    // Elena's History (High Risk Simulation: Increasing BP)
    { patientId: 'PATIENT-67890', recordedById: nurse1.id, bloodPressure: '130/85', weight: 70.0, fetalHeartRate: 138, docNotes: null },
    { patientId: 'PATIENT-67890', recordedById: nurse1.id, bloodPressure: '140/95', weight: 71.5, fetalHeartRate: 140, docNotes: null },
    { patientId: 'PATIENT-67890', recordedById: doctor2.id, bloodPressure: '155/100', weight: 73.0, fetalHeartRate: 148, docNotes: 'Signs of Preeclampsia. Prescribing bed rest and daily monitoring.' }
  ];

  for (const v of historicalVitals) {
    const { docNotes, ...data } = v;
    await prisma.vitals.create({
      data: {
        ...data,
        doctorNotes: docNotes
      }
    });
  }

  console.log('Database seeded with 5 patients and 5 historical records.');
  console.log('Test Doctor: doctor@hospital.com / password123');
  console.log('Test Patient 1: sarah@example.com (PATIENT-12345)');
  console.log('Test Patient 2 (High Risk): elena@mysticfalls.com (PATIENT-67890)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
