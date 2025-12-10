import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const patient = await prisma.user.findUnique({
    where: { email: "patient1@medflow.com" },
    include: { patient: true }
  })

  const doctor = await prisma.user.findUnique({
    where: { email: "dr.smith@medflow.com" }
  })

  if (!patient || !patient.patient || !doctor) {
    console.log("Users not found")
    return
  }

  // Check if completed appointment exists
  const existing = await prisma.appointment.findFirst({
    where: {
      patientId: patient.patient.id,
      status: "completed"
    }
  })

  if (existing) {
    console.log("Completed appointment already exists")
  } else {
    await prisma.appointment.create({
      data: {
        date: new Date(),
        status: "completed",
        patientId: patient.patient.id,
        doctorId: doctor.id
      }
    })
    console.log("Created completed appointment")
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
