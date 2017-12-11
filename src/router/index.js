import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from '../components/recommend/recommend'
// import Singer from '../components/singer/singer'
// import Rank from '../components/rank/rank'
// import Search from '../components/search/search'
// import SingerDetail from '../components/singer-detail/singerDeail'
// import disc from '../components/disc/disc.vue'
// import topList from '../components/topList/topList.vue'
// import userCenter from '../components/userCenter/userCenter'

Vue.use(Router)

const Recommend = resolve => {
  import('../components/recommend/recommend').then(recommend => {
    resolve(recommend)
  })
}

const Singer = resolve => {
  import('../components/singer/singer').then(singer => {
    resolve(singer)
  })
}

const Rank = resolve => {
  import('../components/rank/rank.vue').then(rank => {
    resolve(rank)
  })
}

const Search = resolve => {
  import('../components/search/search.vue').then(search => {
    resolve(search)
  })
}
const SingerDetail = resolve => {
  import('../components/singer-detail/singerDeail.vue').then(singerDetail => {
    resolve(singerDetail)
  })
}

const disc = resolve => {
  import('../components/disc/disc.vue').then(disc => {
    resolve(disc)
  })
}

const topList = resolve => {
  import('../components/topList/topList.vue').then(topList => {
    resolve(topList)
  })
}

const userCenter = resolve => {
  import('../components/userCenter/userCenter').then(userCenter => {
    resolve(userCenter)
  })
}

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: disc
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/rank',
      component: Rank,
      children: [{
        path: ':id',
        component: topList
      }]
    }, {
      path: '/search',
      component: Search,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }, {
      path: '/user',
      component: userCenter
    }
  ]
})
