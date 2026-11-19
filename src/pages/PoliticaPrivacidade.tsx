import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/0Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const ULTIMA_ATUALIZACAO = "19 de novembro de 2026";

const Secao = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
  <section className="space-y-4">
    <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight">
      {titulo}
    </h2>
    <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const PoliticaPrivacidade = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Henrique Arsego";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24 lg:pt-36">
        <div className="container">
          <article className="max-w-3xl mx-auto space-y-12">
            <header className="space-y-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para a página inicial
              </Link>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                Política de Privacidade
              </h1>
              <p className="text-sm text-muted-foreground/70">
                Última atualização: {ULTIMA_ATUALIZACAO}
              </p>
            </header>

            <Secao titulo="1. Quem somos">
              <p>
                Este site (henriquearsego.com.br) é mantido por Henrique Arsego, consultor de
                marketing digital com atuação em Chapecó, SC — Brasil, que é o controlador dos
                dados pessoais tratados por meio dele, nos termos da Lei Geral de Proteção de
                Dados Pessoais (Lei nº 13.709/2018 — LGPD).
              </p>
              <p>
                Esta política explica quais dados são coletados quando você visita o site ou
                entra em contato, para que eles são usados e quais são os seus direitos.
              </p>
            </Secao>

            <Secao titulo="2. Quais dados coletamos">
              <p>
                <strong className="text-foreground">Dados de navegação:</strong> ao acessar o site,
                são coletadas automaticamente informações como endereço IP, tipo de navegador e
                dispositivo, páginas visitadas, tempo de permanência, origem do acesso (por
                exemplo, um anúncio ou resultado de busca) e interações com botões e links.
              </p>
              <p>
                <strong className="text-foreground">Dados de contato:</strong> se você clicar para
                falar pelo WhatsApp ou por telefone, a conversa acontece fora deste site. Nesse
                caso, tratamos os dados que você decidir nos enviar — como nome, telefone, nome
                da empresa e informações sobre o seu negócio.
              </p>
              <p>
                Este site não possui formulário de cadastro, área de login nem realiza vendas
                online, e não solicita dados sensíveis.
              </p>
            </Secao>

            <Secao titulo="3. Cookies e tecnologias de rastreamento">
              <p>
                Utilizamos o Google Tag Manager para gerenciar ferramentas de análise e
                publicidade, como Google Analytics, Google Ads e Meta (Facebook/Instagram). Essas
                ferramentas usam cookies e tecnologias semelhantes para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>medir o número de visitas e entender como o site é utilizado;</li>
                <li>avaliar o desempenho de campanhas e anúncios;</li>
                <li>exibir anúncios mais relevantes para quem já visitou o site (remarketing).</li>
              </ul>
              <p>
                Você pode bloquear ou apagar cookies a qualquer momento nas configurações do seu
                navegador. Também é possível ajustar suas preferências de anúncios diretamente nas
                plataformas, em{" "}
                <a
                  href="https://myadcenter.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Minha Central de Anúncios do Google
                </a>{" "}
                e nas{" "}
                <a
                  href="https://www.facebook.com/adpreferences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Preferências de Anúncios da Meta
                </a>
                .
              </p>
            </Secao>

            <Secao titulo="4. Para que usamos os dados">
              <ul className="list-disc pl-6 space-y-2">
                <li>responder seus contatos e apresentar propostas de serviço;</li>
                <li>melhorar o conteúdo, a navegação e a experiência do site;</li>
                <li>mensurar e otimizar campanhas de marketing;</li>
                <li>cumprir obrigações legais e regulatórias.</li>
              </ul>
              <p>
                As bases legais utilizadas são o legítimo interesse, o consentimento (quando
                aplicável), a execução de procedimentos preliminares a um contrato solicitados por
                você e o cumprimento de obrigação legal.
              </p>
            </Secao>

            <Secao titulo="5. Compartilhamento de dados">
              <p>
                Não vendemos seus dados pessoais. Eles podem ser compartilhados apenas com
                fornecedores necessários para o funcionamento do site e das campanhas — como
                Google, Meta, WhatsApp e provedores de hospedagem — e com autoridades públicas,
                quando exigido por lei.
              </p>
              <p>
                Alguns desses fornecedores podem armazenar dados fora do Brasil. Nesses casos, a
                transferência segue as regras da LGPD e as políticas de privacidade de cada
                fornecedor.
              </p>
            </Secao>

            <Secao titulo="6. Por quanto tempo guardamos os dados">
              <p>
                Os dados são mantidos apenas pelo tempo necessário para cumprir as finalidades
                descritas nesta política ou para atender obrigações legais. Dados de navegação
                seguem os prazos de retenção configurados em cada ferramenta de análise e
                publicidade.
              </p>
            </Secao>

            <Secao titulo="7. Seus direitos">
              <p>Conforme a LGPD, você pode solicitar a qualquer momento:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>confirmação de que tratamos seus dados e acesso a eles;</li>
                <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                <li>portabilidade dos dados a outro fornecedor;</li>
                <li>informação sobre com quem seus dados foram compartilhados;</li>
                <li>revogação do consentimento, quando o tratamento se basear nele.</li>
              </ul>
              <p>
                Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados
                (ANPD).
              </p>
            </Secao>

            <Secao titulo="8. Segurança">
              <p>
                Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra
                acesso não autorizado, perda ou uso indevido. Ainda assim, nenhum sistema na
                internet é totalmente imune a riscos.
              </p>
            </Secao>

            <Secao titulo="9. Alterações nesta política">
              <p>
                Esta política pode ser atualizada periodicamente. A data da versão mais recente
                fica sempre indicada no topo desta página.
              </p>
            </Secao>

            <Secao titulo="10. Contato">
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre esta política, fale diretamente
                com Henrique Arsego pelo WhatsApp ou telefone{" "}
                <a href="tel:+5551996719696" className="text-accent hover:underline">
                  +55 51 99671-9696
                </a>
                .
              </p>
            </Secao>
          </article>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PoliticaPrivacidade;
