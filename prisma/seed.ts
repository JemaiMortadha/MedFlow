import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Create patients first
    const patient1Data = await prisma.patient.create({
        data: {
            name: 'John Patient',
            email: 'patient1@medflow.com',
            phone: '+1234567890',
            birthDate: new Date('1990-05-15'),
            medicalHistory: 'No known allergies. Regular checkups.',
        },
    })

    const patient2Data = await prisma.patient.create({
        data: {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            phone: '+1234567891',
            birthDate: new Date('1985-08-20'),
            medicalHistory: 'Diabetes type 2. On medication.',
        },
    })

    const patient3Data = await prisma.patient.create({
        data: {
            name: 'Bob Smith',
            email: 'bob.smith@example.com',
            phone: '+1234567892',
            birthDate: new Date('1978-03-10'),
            medicalHistory: 'Hypertension. Regular monitoring required.',
        },
    })

    // Create demo users
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@medflow.com',
            name: 'Admin User',
            password: 'password',
            role: 'ADMIN',
        },
    })

    const doctorUser = await prisma.user.create({
        data: {
            email: 'dr.smith@medflow.com',
            name: 'Dr. Smith',
            password: 'password',
            role: 'DOCTOR',
        },
    })

    const receptionistUser = await prisma.user.create({
        data: {
            email: 'reception@medflow.com',
            name: 'Reception Desk',
            password: 'password',
            role: 'RECEPTIONIST',
        },
    })

    const patientUser = await prisma.user.create({
        data: {
            email: 'patient1@medflow.com',
            name: 'John Patient',
            password: 'password',
            role: 'PATIENT',
            patientId: patient1Data.id,
        },
    })

    // Create sample appointments
    const today = new Date()
    today.setHours(10, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    await prisma.appointment.create({
        data: {
            date: today,
            status: 'scheduled',
            doctorId: doctorUser.id,
            patientId: patient1Data.id,
        },
    })

    await prisma.appointment.create({
        data: {
            date: tomorrow,
            status: 'scheduled',
            doctorId: doctorUser.id,
            patientId: patient2Data.id,
        },
    })

    await prisma.appointment.create({
        data: {
            date: nextWeek,
            status: 'scheduled',
            doctorId: doctorUser.id,
            patientId: patient3Data.id,
        },
    })

    console.log('Database seeded successfully!')
    console.log('\nDemo Users:')
    console.log('- admin@medflow.com / password (ADMIN)')
    console.log('- dr.smith@medflow.com / password (DOCTOR)')
    console.log('- reception@medflow.com / password (RECEPTIONIST)')
    console.log('- patient1@medflow.com / password (PATIENT)')
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
