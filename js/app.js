new Vue({
  el: "#app",
  data: {
    github_base_url: "https://github.com/",
    github_api_base_url: "https://api.github.com/repos/",
    github_repositories: [
      {
        name: "Revenue Monster",
        desc: "Revenue Monster Payment Gateway for Node.js Package",
        github_url: "RevenueMonster/rm-js-sdk",
        is_creator: true,
        stars_count: 102,
        forks_count: 44,
      },
    ],
  },
  mounted() {
    this.fetchGithubData();
  },
  methods: {
    fetchGithubData: function () {
      let $this = this;
      $this.github_repositories.map(function (item, key) {
        $this.apiRequest($this.buildUrl(item.github_url, true)).then(
          (response) => {
            if (parseInt(response.status) === 200) {
              item.stars_count = response.data.stargazers_count;
              item.forks_count = response.data.forks_count;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    apiRequest: function (url, method = "get", data = {}) {
      return axios({
        method: method,
        url: url,
        data: data,
      });
    },
    buildUrl: function (url, is_api = false) {
      return is_api === true
        ? this.github_api_base_url + url
        : this.github_base_url + url;
    },
    getContributionClass: function (item) {
      return item.is_creator ? "creator" : "contributor";
    },
  },
});
