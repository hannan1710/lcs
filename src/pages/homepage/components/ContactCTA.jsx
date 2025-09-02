import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const ContactCTA = () => {
  const contactInfo = [
    {
      icon: "MapPin",
      title: "Visit Us",
      content:
        "Thane: Shop no. 11&12, Saraswati school, Anand Nagar, Thane West\nPowai: SN 161&162 floor 1st, galleriya, Hiranandani Gardens, Powai",
      action: "Get Directions",
      link: "/contact-location",
    },
    {
      icon: "Phone",
      title: "Call Us",
      content: "Thane: +91 99670 02481\nPowai: +91 74000 68615",
      action: "Call Now",
      link: "tel:+919967002481",
    },
    {
      icon: "Clock",
      title: "Hours",
      content: "Mon-Sat: 9AM-8PM\nSun: 10AM-6PM",
      action: "View Schedule",
      link: "/contact-location",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Book your appointment today and experience the luxury and artistry
            that sets La Coiffure apart from the rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold"
              onClick={() => (window.location.href = "/appointment-booking")}
              iconName="Calendar"
              iconPosition="left"
            >
              Book Appointment
            </Button>

            <Link to="/services-catalog">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg"
                iconName="Scissors"
                iconPosition="left"
              >
                View Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactInfo?.map((info, index) => (
            <div key={index} className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={info?.icon} size={32} className="text-accent" />
              </div>

              <h3 className="font-heading text-xl font-semibold mb-3">
                {info?.title}
              </h3>

              <p className="text-primary-foreground/80 mb-4 whitespace-pre-line">
                {info?.content}
              </p>

              {info?.link?.startsWith("tel:") ? (
                <a href={info?.link}>
                  <Button
                    variant="ghost"
                    className="text-accent hover:text-accent hover:bg-accent/10"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {info?.action}
                  </Button>
                </a>
              ) : (
                <Link to={info?.link}>
                  <Button
                    variant="ghost"
                    className="text-accent hover:text-accent hover:bg-accent/10"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {info?.action}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Priority Contact Section
        <div className="mt-16 text-center">
          <div className="bg-primary-foreground/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="AlertCircle" size={24} className="text-accent" />
              <h3 className="font-heading text-xl font-semibold">
                Need Immediate Assistance?
              </h3>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              For urgent appointments or special requests, contact our priority booking line.
            </p>
            <a href="tel:+919967002481">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                iconName="Phone"
                iconPosition="left"
              >
                Priority Line: +91 99670 02481
              </Button>
            </a>
          </div>
        </div> */}

        {/* Social Media Links */}
        <div className="mt-16 text-center">
          <h3 className="font-heading text-xl font-semibold mb-6">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-4">
            {[
              {
                name: "Instagram",
                icon: "Instagram",
                url: "https://instagram.com/lacoiffuresalon",
              },
              {
                name: "Facebook",
                icon: "Facebook",
                url: "https://facebook.com/lacoiffuresalons",
              },
             
              {
                name: "YouTube",
                icon: "Youtube",
                url: "https://youtube.com/@imranlcs",
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-luxury"
                aria-label={`Follow us on ${social.name}`}
              >
                <Icon name={social.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
