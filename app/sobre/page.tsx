import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Truck, Shield, Award, Clock } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Paixão pela Moda",
      description: "Vivemos e respiramos moda, sempre em busca das últimas tendências e estilos únicos.",
    },
    {
      icon: Users,
      title: "Foco no Cliente",
      description: "Nossos clientes são nossa prioridade. Trabalhamos para superar suas expectativas sempre.",
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Selecionamos cuidadosamente cada peça, garantindo materiais de alta qualidade.",
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Sua segurança é fundamental. Oferecemos transações 100% seguras e protegidas.",
    },
  ]

  const benefits = [
    {
      icon: Truck,
      title: "Frete Grátis",
      description: "Frete grátis para compras acima de R$ 150",
    },
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Entregamos em até 3 dias úteis para todo o Brasil",
    },
    {
      icon: Shield,
      title: "Troca Garantida",
      description: "30 dias para trocas e devoluções sem complicação",
    },
  ]

  const team = [
    {
      name: "Ana Silva",
      role: "Fundadora & CEO",
      image: "/placeholder.svg?height=300&width=300",
      description: "Formada em Design de Moda, Ana tem mais de 10 anos de experiência no mercado fashion.",
    },
    {
      name: "Carlos Santos",
      role: "Diretor Comercial",
      image: "/placeholder.svg?height=300&width=300",
      description: "Especialista em e-commerce com vasta experiência em vendas online e relacionamento com clientes.",
    },
    {
      name: "Marina Costa",
      role: "Estilista Chefe",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Responsável pela curadoria de produtos e tendências, sempre de olho no que há de mais atual na moda.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Nossa História
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sobre a ModaStore</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Nascemos da paixão pela moda e do desejo de democratizar o acesso a roupas de qualidade. Desde 2020,
              conectamos pessoas ao seu estilo único através de peças cuidadosamente selecionadas.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Nossa Jornada</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  A ModaStore nasceu em 2020, em plena pandemia, quando percebemos que as pessoas precisavam se sentir
                  bem consigo mesmas, mesmo em casa. Começamos como um pequeno projeto familiar e hoje somos uma das
                  principais lojas de moda online do Brasil.
                </p>
                <p>
                  Nossa missão sempre foi clara: oferecer roupas de qualidade, com preços justos e um atendimento
                  excepcional. Acreditamos que a moda é uma forma de expressão pessoal e que todos merecem se sentir
                  confiantes e estilosos.
                </p>
                <p>
                  Hoje, atendemos milhares de clientes em todo o país, sempre mantendo nossos valores de qualidade,
                  autenticidade e respeito pelo cliente.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Nossa loja"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Os princípios que nos guiam em cada decisão e nos conectam com nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que Escolher a ModaStore?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos muito mais que roupas bonitas. Proporcionamos uma experiência completa de compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <benefit.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conheça Nossa Equipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">As pessoas apaixonadas que tornam a ModaStore possível</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <Badge variant="secondary">{member.role}</Badge>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50k+</div>
              <div className="text-gray-600">Clientes Satisfeitos</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">1000+</div>
              <div className="text-gray-600">Produtos Disponíveis</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">4.8</div>
              <div className="text-gray-600">Avaliação Média</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">99%</div>
              <div className="text-gray-600">Entregas no Prazo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa História</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de pessoas que já descobriram seu estilo único conosco
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/produtos"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explorar Produtos
            </a>
            <a
              href="/contato"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
