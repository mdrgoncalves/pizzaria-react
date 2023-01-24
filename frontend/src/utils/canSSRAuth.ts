import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "services/errors/AuthTokenError";

// Função para páginas que só podem ser acessadas por user logados
export function canSSRAuth<P>(fn: GetServerSideProps<P>) {

    return async(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
            
        const cookies = parseCookies(context);
        const token = cookies['@nextauth.token'];

        // Redirecionar se não tiver um login salvo
        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {
            return await fn(context);
        } catch(err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(context, '@nextauth.token');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}