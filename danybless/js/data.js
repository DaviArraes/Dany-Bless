/* =====================================================================
   DADOS DO SITE — edite aqui (WhatsApp, fotos, números e projetos)
   ===================================================================== */
const CONFIG = {
  whatsapp: "5598987065352",
  photo: "assets/foto-daniella-2.jpg",   // foto principal (seção "O que fazemos")
  photo2: "assets/foto-daniella-estudio.jpg",  // foto do card da fundadora
  linkedin: "https://www.linkedin.com/in/daniellaarraes/"
};

/* =====================================================================
   NÚMEROS (faixa de estatísticas) — dados do Portfólio Executivo
   ===================================================================== */
const STATS = [
  { n: 30,    prefix: "",     suffix: "+" },   // anos de experiência
  { n: 198,   prefix: "",     suffix: "+" },   // municípios alcançados
  { n: 20000, prefix: "",     suffix: "+" },   // profissionais liderados
  { n: 5,     prefix: "R$ ",  suffix: "M" },   // carteira gerenciada / mês
  { n: 2,     prefix: "< ",   suffix: "%" }    // inadimplência mantida
];

/* =====================================================================
   PROJETOS — dados do Portfólio Executivo (fotos em assets/projects/)
   Campos {pt,en,es} aparecem no idioma escolhido pelo visitante.
   Para adicionar outro projeto, copie um bloco e ajuste.
   ===================================================================== */
const PROJECTS = [
  {
    category: { pt: "Sustentabilidade e educação ambiental", en: "Sustainability and environmental education", es: "Sostenibilidad y educación ambiental" },
    title:    { pt: "Cultivando Consciência", en: "Cultivating Awareness", es: "Cultivando Conciencia" },
    subtitle: { pt: "Contra Queimadas e a Favor da Agroecologia", en: "Against Wildfires and in Favor of Agroecology", es: "Contra las Quemas y a Favor de la Agroecología" },
    role:     { pt: "Coordenadora geral do projeto", en: "Project general coordinator", es: "Coordinadora general del proyecto" },
    summary: {
      pt: "Educação ambiental e sustentabilidade para crianças e adolescentes em vulnerabilidade social, por meio de hortas agroecológicas, oficinas práticas e mobilização comunitária, com responsabilidade direta pelo planejamento, coordenação da equipe técnica, acompanhamento de indicadores e articulação institucional.\n\nHortas agroecológicas implantadas em três instituições parceiras, promovendo consciência ambiental e segurança alimentar.",
      en: "Environmental education and sustainability for children and teenagers in social vulnerability, through agroecological gardens, hands-on workshops and community mobilization, with direct responsibility for planning, technical team coordination, indicator monitoring and institutional coordination.\n\nAgroecological gardens were established in three partner institutions, promoting environmental awareness and food security.",
      es: "Educación ambiental y sostenibilidad para niños y adolescentes en situación de vulnerabilidad social, mediante huertos agroecológicos, talleres prácticos y movilización comunitaria, con responsabilidad directa de la planificación, la coordinación del equipo técnico, el seguimiento de indicadores y la articulación institucional.\n\nHuertos agroecológicos implantados en tres instituciones aliadas, promoviendo la conciencia ambiental y la seguridad alimentaria."
    },
    stats: [
      { value: "109", label: { pt: "alunos matriculados", en: "students enrolled", es: "alumnos matriculados" } },
      { value: "57",  label: { pt: "alunos certificados", en: "students certified", es: "alumnos certificados" } },
      { value: "R$ 275 mil", label: { pt: "investimento total (FMDCA)", en: "total investment (FMDCA)", es: "inversión total (FMDCA)" } }
    ],
    partners: ["IEMA", "SEDUC", "CEPAC"],
    image: "assets/projects/cultivando-consciencia.jpg",
    gallery: ["assets/projects/cultivando-consciencia.jpg"]
  },
  {
    category: { pt: "Educação e juventude", en: "Education and youth", es: "Educación y juventud" },
    title:    { pt: "Formação de Jovens para o Mercado de Trabalho e Empreendedorismo", en: "Youth Training for the Job Market and Entrepreneurship", es: "Formación de Jóvenes para el Mercado Laboral y el Emprendimiento" },
    subtitle: { pt: "Programa Jovem Aprendiz Rural", en: "Rural Young Apprentice Program", es: "Programa Joven Aprendiz Rural" },
    role:     { pt: "Mentora e instrutora · SENAR Maranhão", en: "Mentor and instructor · SENAR Maranhão", es: "Mentora e instructora · SENAR Maranhão" },
    summary: {
      pt: "Como mentora e instrutora do Programa Jovem Aprendiz Rural no SENAR Maranhão, Daniella dedicou sua carreira à formação de jovens em comunidades urbanas e rurais, promovendo o desenvolvimento de competências técnicas, empreendedoras e socioemocionais.\n\nMinistrou disciplinas como Ética e Cidadania, Empreendedorismo e Planejamento Estratégico, sempre aliando conhecimento prático, inovação e desenvolvimento humano.",
      en: "As a mentor and instructor of the Rural Young Apprentice Program at SENAR Maranhão, Daniella dedicated her career to training young people in urban and rural communities, fostering technical, entrepreneurial and socio-emotional skills.\n\nShe taught subjects such as Ethics and Citizenship, Entrepreneurship and Strategic Planning, always combining practical knowledge, innovation and human development.",
      es: "Como mentora e instructora del Programa Joven Aprendiz Rural en SENAR Maranhão, Daniella dedicó su carrera a la formación de jóvenes en comunidades urbanas y rurales, promoviendo el desarrollo de competencias técnicas, emprendedoras y socioemocionales.\n\nImpartió asignaturas como Ética y Ciudadanía, Emprendimiento y Planificación Estratégica, siempre uniendo conocimiento práctico, innovación y desarrollo humano."
    },
    stats: [
      { value: "+1.300", label: { pt: "jovens capacitados", en: "young people trained", es: "jóvenes capacitados" } },
      { value: "+30",    label: { pt: "turmas formadas", en: "classes completed", es: "grupos formados" } }
    ],
    image: "assets/projects/jovem-aprendiz-1.jpg",
    gallery: ["assets/projects/jovem-aprendiz-1.jpg", "assets/projects/jovem-aprendiz-2.jpg", "assets/projects/jovem-aprendiz-3.jpg"]
  },
  {
    category: { pt: "Facilitação e mentoria", en: "Facilitation and mentoring", es: "Facilitación y mentoría" },
    title:    { pt: "Projeto Elas Empreendedoras", en: "Elas Empreendedoras Project", es: "Proyecto Elas Empreendedoras" },
    subtitle: { pt: "ENEVA · IEL Maranhão", en: "ENEVA · IEL Maranhão", es: "ENEVA · IEL Maranhão" },
    role:     { pt: "Atuação como facilitadora", en: "Acting as facilitator", es: "Actuación como facilitadora" },
    summary: {
      pt: "Uma iniciativa desenvolvida em parceria com a ENEVA e o IEL Maranhão para fortalecer o empreendedorismo feminino em Santo Antônio dos Lopes (MA).\n\nDaniella foi responsável pelo planejamento e condução de uma formação voltada ao desenvolvimento de competências em comunicação estratégica, oratória, storytelling, técnicas de vendas, psicologia da decisão, inovação e uso de inteligência artificial aplicada aos negócios.\n\nO projeto gerou elevado engajamento das participantes, fortaleceu competências empreendedoras, ampliou a confiança na comunicação e contribuiu para o posicionamento estratégico dos negócios locais. A avaliação da formação foi amplamente positiva, com reconhecimento da relevância do conteúdo, da didática aplicada e do impacto imediato na atuação das empreendedoras, reforçando o potencial de continuidade e expansão da iniciativa.",
      en: "An initiative developed in partnership with ENEVA and IEL Maranhão to strengthen women's entrepreneurship in Santo Antônio dos Lopes (MA).\n\nDaniella was responsible for planning and leading a training program focused on strategic communication, public speaking, storytelling, sales techniques, decision psychology, innovation and the use of artificial intelligence applied to business.\n\nThe project generated high engagement among participants, strengthened entrepreneurial skills, increased communication confidence and contributed to the strategic positioning of local businesses. The training was very positively evaluated, with recognition of the relevance of the content, the teaching approach and the immediate impact on the entrepreneurs' work, reinforcing the potential for continuity and expansion of the initiative.",
      es: "Una iniciativa desarrollada en alianza con ENEVA e IEL Maranhão para fortalecer el emprendimiento femenino en Santo Antônio dos Lopes (MA).\n\nDaniella fue responsable de la planificación y conducción de una formación orientada al desarrollo de competencias en comunicación estratégica, oratoria, storytelling, técnicas de ventas, psicología de la decisión, innovación y uso de inteligencia artificial aplicada a los negocios.\n\nEl proyecto generó un alto compromiso de las participantes, fortaleció competencias emprendedoras, amplió la confianza en la comunicación y contribuyó al posicionamiento estratégico de los negocios locales. La evaluación de la formación fue ampliamente positiva, con reconocimiento de la relevancia del contenido, de la didáctica aplicada y del impacto inmediato en la actuación de las emprendedoras, reforzando el potencial de continuidad y expansión de la iniciativa."
    },
    tags: [
      { pt: "Formação de mulheres empreendedoras", en: "Training women entrepreneurs", es: "Formación de mujeres emprendedoras" },
      { pt: "Comunicação estratégica", en: "Strategic communication", es: "Comunicación estratégica" },
      { pt: "Psicologia das vendas", en: "Sales psychology", es: "Psicología de las ventas" }
    ],
    image: "assets/projects/elas-empreendedoras.jpg",
    gallery: ["assets/projects/elas-empreendedoras.jpg"]
  }
];

/* =====================================================================
   DEPOIMENTOS (do Portfólio Executivo)
   ===================================================================== */
const TESTIMONIALS = [
  { name: "Pedro Henrique Oliveira Silva",
    text: { pt: "Descobri um novo ‘eu’ através do curso. A professora Daniella Arraes marcou minha vida com seu profissionalismo.",
            en: "I discovered a new ‘me’ through the course. Professor Daniella Arraes marked my life with her professionalism.",
            es: "Descubrí un nuevo ‘yo’ a través del curso. La profesora Daniella Arraes marcó mi vida con su profesionalismo." } },
  { name: "Leonardo de Oliveira",
    text: { pt: "Ela acreditava na gente e nos ensinou a acreditar em nós mesmos.",
            en: "She believed in us and taught us to believe in ourselves.",
            es: "Ella creía en nosotros y nos enseñó a creer en nosotros mismos." } },
  { name: "Adrieli Marinho",
    text: { pt: "Seu profissionalismo, carinho e dedicação deixaram marcas profundas em nossa turma.",
            en: "Her professionalism, care and dedication left deep marks on our class.",
            es: "Su profesionalismo, cariño y dedicación dejaron huellas profundas en nuestro grupo." } }
];
