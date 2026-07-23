# Configuration Supabase Auth — EAU TURQUOISE

Le projet Supabase lié est `lnttqyoejjsackpoimke`.

## URLs Supabase

- URL de callback Google et Apple : `https://lnttqyoejjsackpoimke.supabase.co/auth/v1/callback`
- Ajouter l'URL publique finale du site dans **Authentication > URL Configuration > Site URL**.
- Ajouter aussi `http://localhost:8081/connexion` et l'URL publique finale suivie de `/connexion` dans **Redirect URLs**.

## Google

1. Dans Google Cloud Console, créer un client OAuth 2.0 de type **Application Web**.
2. Ajouter la callback Supabase ci-dessus dans **Authorized redirect URIs**.
3. Copier le Client ID et le Client Secret dans **Supabase > Authentication > Providers > Google**, puis activer le fournisseur.

## Apple

1. Dans Apple Developer, créer un **Services ID** avec *Sign in with Apple*.
2. Déclarer le domaine `lnttqyoejjsackpoimke.supabase.co` et la callback Supabase ci-dessus.
3. Créer une clé *Sign in with Apple* et relever le Team ID, le Services ID et le Key ID.
4. Générer le secret Apple, le copier avec le Services ID dans **Supabase > Authentication > Providers > Apple**, puis activer le fournisseur.

## Panier synchronisé

Appliquer `supabase/migrations/20260722143000_create_user_carts.sql` au projet Supabase. La table utilise la sécurité par ligne : chaque utilisateur authentifié ne peut lire et modifier que son propre panier.
