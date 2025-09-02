import React, { useEffect } from "react";

const ClientTestimonials = () => {
  useEffect(() => {
    // Load Elfsight script only once
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup if component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="w-full px-2 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl lg:text-4xl font-bold text-foreground mb-3">
            What Our Clients Say
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real Google Reviews from our valued clients.
          </p>
        </div>

        {/* Elfsight Google Reviews Embed - Full Width */}
        <div className="w-full flex justify-center">
          <div
            className="elfsight-app-0b45c196-ba24-4cc0-ad38-2a11f20b8c6c w-full"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
