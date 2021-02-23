const App = Vue.createApp({
    data() {
        return {
            currentPageFlag: 2, //1 - createArticlePage,2 - top10page,3 -allArticles, 4 - aboutMe
            form: {
                title: '',
                description: '',
                date: ''
            },
            articles: []
        }
    },
    methods: {
        async createArticle() {
            const {...article} = this.form

            const newArticle = await request('/api/articles', 'POST', article)
            this.articles.push(newArticle)

        },
        async markArticle(id) {
            const article = this.articles.find(c => c.id === id)
            const updated = await request(`/api/articles/${id}`, 'PUT', {
                ...article,
                marked: true
            })
            article.marked = updated.marked
        },
        async removeArticle(id) {
            await request(`/api/articles/${id}`, 'DELETE')
            this.articles = this.articles.filter(c => c.id !== id)
        }

    },
    async mounted() {
        this.articles = await request('/api/articles')

    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}

App.component('navbar', {
    template: '<div style="height: 59px">\n' +
        '    <nav>\n' +
        '        <span class="brand-logo" style="margin-left: 10px; font-size: xxx-large; width: fit-content; font-family: sans-serif">News</span>\n' +
        '    </nav>\n' +
        '</div>'
})


App.mount('#app')
