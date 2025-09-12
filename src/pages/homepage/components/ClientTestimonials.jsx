import React, { useState, useEffect } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ashish S.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjV4s4r5E6t5F5y8G7c7g7b7h7d7f7i7j7k7l7m7n7o7p7q7r7s7t7u7v7w7x7y7z=w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Amazing service. Had a haircut and beard grooming by Imran. It was a wonderful experience, he is a perfectionist. I would highly recommend the salon.`,
      service: "Haircut & Beard Grooming",
      date: "Sep 2023",
    },
    {
      id: 2,
      name: "Rishabh K.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjX1y5z4k3j2i1h0g9f8e7d6c5b4a3a2b1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Had a great experience. The staff is very polite and professional. Loved the ambiance.`,
      service: "General Salon Service",
      date: "Oct 2023",
    },
    {
      id: 3,
      name: "Pooja V.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXw3z2y1x0v9u8t7s6r5q4p3o2n1m0l9k8j7i6h5g4f3e2d1c0b9a8-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Awesome service. I am happy with my hair spa and haircut. Imran has done a very good job. Very professional salon.`,
      service: "Haircut & Spa",
      date: "Nov 2023",
    },
    {
      id: 4,
      name: "Aarav P.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXV9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3a2-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `The ambiance is very good. The staff is professional and Nizam did a great job with my hair color. Happy with the result.`,
      service: "Hair Color",
      date: "Oct 2023",
    },
    {
      id: 5,
      name: "Anjali G.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjU5b4a3a2b1c0d9e8f7g6h5i4j3k2l1m0n9o8p7q6r5s4t3u2v1w0x9y8z7a6-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Good service and friendly staff. The haircut was perfectly done by Imran. Highly recommended!`,
      service: "Haircut",
      date: "Nov 2023",
    },
    {
      id: 6,
      name: "Nitin J.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjV4s4r5E6t5F5y8G7c7g7b7h7d7f7i7j7k7l7m7n7o7p7q7r7s7t7u7v7w7x7y7z-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `Excellent salon. Hygienic place and very professional staff. I got a facial and it was done with utmost care.`,
      service: "Facial Treatment",
      date: "Dec 2023",
    },
    {
      id: 7,
      name: "Shruti D.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXV9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3a2-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `My first time here and I am very impressed. The haircut was great and the stylist was knowledgeable.`,
      service: " Haircut",
      date: "Jan 2024",
    },
    {
      id: 8,
      name: "Gautam R.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXV9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3a2-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `I got my hair coloured by Hashim. He is a genius! The colour turned out exactly as I wanted.`,
      service: "Hair Colouring",
      date: "Feb 2024",
    },
    {
      id: 9,
      name: "Priya S.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjU5b4a3a2b1c0d9e8f7g6h5i4j3k2l1m0n9o8p7q6r5s4t3u2v1w0x9y8z7a6-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `I had my mani-pedi done here. The staff was so gentle and professional. The salon is clean and relaxing.`,
      service: "Mani-Pedi",
      date: "Mar 2024",
    },
    {
      id: 10,
      name: "Rahul B.",
      rating: 5,
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjV4s4r5E6t5F5y8G7c7g7b7h7d7f7i7j7k7l7m7n7o7p7q7r7s7t7u7v7w7x7y7z-w60-h60-p-c0x00000000-rp-mo-br100",
      testimonial: `The best salon experience in Powai. The team, especially Imran, is excellent. He listened to my needs and delivered perfectly.`,
      service: "Styling & Grooming",
      date: "Apr 2024",
    },
    {
      id: 11,
      name: "Kavya M.",
      rating: 5,
      image: "https://lh3.googleusercontent.com/a-/ALV-UjX1y5z4k3j2i1h0g9f8e7d6c5b4a3a2b1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g-w60-h60-p-c0x00000000-rp-mo-br1001",
      testimonial: `I love the hygiene of this place. The staff are so welcoming and they genuinely care about giving a good service.`,
      service: "Salon Experience",
      date: "Mar 2024",
    },
    {
      id: 12,
      name: "Manav T.",
      rating: 5,
      image: "https://lh3.googleusercontent.com/a-/ALV-UjX1y5z4k3j2i1h0g9f8e7d6c5b4a3a2b1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g-w60-h60-p-c0x00000000-rp-mo-br1002",
      testimonial: `Visited the Thane branch. The service was top-notch and the atmosphere was very peaceful. My haircut was flawless.`,
      service: "Haircut",
      date: "Apr 2024",
    },
    {
      id: 13,
      name: "Sneha L.",
      rating: 5,
      image: "https://lh3.googleusercontent.com/a-/ALV-UjX1y5z4k3j2i1h0g9f8e7d6c5b4a3a2b1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g-w60-h60-p-c0x00000000-rp-mo-br1003",
      testimonial: `I came for a bridal makeup trial. Shahi was very professional and patient. She listened to all my suggestions and did a fantastic job!`,
      service: "Bridal Makeup Trial",
      date: "May 2024",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="py-10 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
            What Our Clients Say
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground max-w-xl mx-auto">
            Hear from our satisfied clients who experienced the La Coiffure
            difference.
          </p>
        </div>
        
        {/* Testimonial Card */}
        {/* Added 'relative' here to make absolute positioning work for the arrows */}
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-6 lg:p-8">
              {/* Profile Section */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-accent/20">
                  <Image
                    src={currentData?.image}
                    alt={currentData?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-sm lg:text-base">
                    {currentData?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {currentData?.date}
                  </p>
                </div>
              </div>
              {/* Service above stars */}
              <p className="text-accent text-sm font-medium mb-1">
                {currentData?.service}
              </p>
              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: currentData?.rating }).map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={18}
                    className="text-accent fill-current"
                  />
                ))}
              </div>
              {/* Testimonial Text */}
              <blockquote className="text-base lg:text-lg text-foreground mb-6 italic leading-relaxed">
                "{currentData?.testimonial}"
              </blockquote>
            </div>
          </div>
          
          {/*
            Corrected Navigation Arrows:
            - They are now outside the `bg-card` div.
            - `absolute` positioning is relative to the parent `max-w-3xl` div.
            - `left-0` and `right-0` position them at the edges.
            - `sm:left-[-1.5rem]` and `sm:right-[-1.5rem]` move them slightly off the card on desktop for a more polished look.
          */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 sm:left-[-1.5rem]"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 sm:right-[-1.5rem]"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;