import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  { id: 1, title: "Luxury Car Detailing", image: "/assets/project_1.jpg" },
  { id: 2, title: "Eco-Friendly Wash", image: "/assets/project_2.jpg" },
  { id: 3, title: "Fleet Cleaning", image: "/assets/project_3.jpg" },
  { id: 4, title: "Interior Restoration", image: "/assets/project_4.jpg" },
]

export function ProjectGallery() {
  return (
    <section className="py-16 bg-orange-50 dark:bg-orange-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-orange-950 dark:text-orange-50 mb-8">Our Project Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className={`overflow-hidden ${project.id === 1 || project.id === 4 ? 'lg:col-span-2' : ''}`}>
              <CardContent className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4 bg-white dark:bg-orange-800">
                  <h3 className="text-lg font-semibold text-orange-950 dark:text-orange-50">{project.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
   
        </div>
      </div>
    </section>
  )
}

