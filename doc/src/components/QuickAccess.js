import React from "react";
import Card from "./Card";

const QuickAccess = () => {
  return (
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <Card
              class="col"
              title="Démarrage rapide"
              description="Tutoriel qui vous accompagnera pas à pas pour créer un premier bordereau sur la plateforme Trackdéchets"
              link="/quickstart"
            />
          </div>
          <div class="col">
            <Card
              class="col"
              title="Guides"
              description="Guide pour réaliser des actions spécifiques sur la plateforme Trackdéchets"
              link="/guides/playground"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <Card
              class="col"
              title="Référence"
              description="Référence de l'API"
              link="/reference/api-reference/bsdd/queries"
            />
          </div>
          <div class="col">
            <Card
              class="col"
              title="Concepts"
              description="Aborde les grands principes et standards utilisés par la plateforme Trackdéchets"
              link="/concepts/graphql"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
