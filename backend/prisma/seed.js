const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Limpar dados existentes
    await prisma.booking.deleteMany({});
    await prisma.barber.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.barbershop.deleteMany({});

    console.log("🧹 Limpando dados antigos...");

    const barberImages = [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/men/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/men/6.jpg",
      "https://randomuser.me/api/portraits/men/7.jpg",
      "https://randomuser.me/api/portraits/men/8.jpg",
      "https://randomuser.me/api/portraits/men/9.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
    ];

    const barberNames = [
      "Carlos Silva",
      "João Santos",
      "Pedro Oliveira",
      "Lucas Souza",
      "Rafael Costa",
      "Bruno Lima",
      "Felipe Alves",
      "Gustavo Pereira",
    ];

    const specialties = [
      "Cortes Clássicos",
      "Barba & Bigode",
      "Cortes Modernos",
      "Degradê",
      "Cortes Infantis",
      "Penteados",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        duration: 60,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        duration: 45,
        imageUrl: "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        duration: 30,
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        duration: 20,
        imageUrl: "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        duration: 30,
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        duration: 25,
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Corte + Barba",
        description: "Combo completo: corte de cabelo e barba.",
        price: 90.0,
        duration: 90,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
    ];

    console.log("🏪 Criando barbearia Johnny Barber...");

    const barbershop = await prisma.barbershop.create({
      data: {
        name: "Johnny Barber",
        address: "Avenida São Sebastião, 947 - São Paulo, SP",
        description:
          "A melhor barbearia vintage da cidade. Tradição e estilo desde 1950. Oferecemos serviços de alta qualidade com profissionais experientes.",
        phones: ["(11) 99034-5308", "(11) 99563-2351"],
        imageUrl: "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      },
    });

    console.log(`✓ Barbearia criada: ${barbershop.name}`);

    // Criar serviços
    console.log("💈 Criando serviços...");
    for (const service of services) {
      await prisma.service.create({
        data: {
          ...service,
          barbershopId: barbershop.id,
        },
      });
    }
    console.log(`✓ ${services.length} serviços criados`);

    // Criar barbeiros
    console.log("👨‍🦰 Criando barbeiros...");
    const numberOfBarbers = 8;

    for (let i = 0; i < numberOfBarbers; i++) {
      await prisma.barber.create({
        data: {
          name: barberNames[i],
          barbershopId: barbershop.id,
          imageUrl: barberImages[i],
          description: `Profissional experiente com mais de ${5 + i} anos na área. Especializado em atendimento personalizado e cortes de alta qualidade.`,
          specialty: specialties[i % specialties.length],
        },
      });
    }

    console.log(`✓ ${numberOfBarbers} barbeiros criados`);

    console.log("\n✅ Seed executado com sucesso!");
    console.log(`📊 Barbearia: ${barbershop.name}`);
    console.log(`📊 Serviços: ${services.length}`);
    console.log(`📊 Barbeiros: ${numberOfBarbers}`);
  } catch (error) {
    console.error("❌ Erro ao executar seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
