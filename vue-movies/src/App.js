import Header from './components/Header.js';

const template = `
<div class="app">
    <Header/>
    <RouterView/>
</div>
`;

export default {
  template,
  components: {
    Header
  }
};
