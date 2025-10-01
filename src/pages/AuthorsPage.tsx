import CreateAuthorForm from './CreateAuthorForm';
import Authors from './Authors';

const AuthorPage = () => (
  <div className="space-y-8">
    <CreateAuthorForm onCreated={() => window.location.reload()} />
    <Authors />
  </div>
);

export default AuthorPage;