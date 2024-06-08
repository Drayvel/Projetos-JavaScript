const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

    createApp({
      data() {
        return {
          digimons: [],
          loading: true,
          searchText: '',
          nextPage: 1
        };
      },
      computed: {
        filteredDigimons() {
          return this.digimons.filter(digimon =>
            digimon.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
        }
      },
      created() {
        this.fetchDigimons();
      },
      methods: {
        async fetchDigimons() {
          try {
            const response = await fetch('https://digimon-api.vercel.app/api/digimon');
            const data = await response.json();
            this.digimons = data;
            this.loading = false;
          } catch (error) {
            console.error('Erro ao carregar digimons:', error);
            this.loading = false;
          }
        },
        handleScroll() {
          const bottomOfPage = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

          if (bottomOfPage && !this.loading) {
            this.loading = true;
            this.fetchDigimons();
          }
        }
      }
    }).mount('#app');