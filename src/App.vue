<template>
  <main>
    <CommonTable
    :groupedPosts="groupedPosts"
    :errorMessage="errorMessage"
    />
  </main>
</template>

<script setup>
import CommonTable from '@/components/Table.vue'
import { GET_USERS, GET_POSTS, GET_COMMENTS } from '@/config'
import { onMounted, ref } from 'vue'
import { useHttp } from '@/core/http-request'

const { httpGet } = useHttp()
const usersResponse = ref()
const postsResponse = ref()
const commentsResponse = ref()
const groupedPosts = ref([])

const errorMessage = ref('')

async function getResponse() {
  try {
    const [users, posts, comments] = await Promise.all([
      httpGet(GET_USERS),
      httpGet(GET_POSTS),
      httpGet(GET_COMMENTS),
    ])
    writeResponse(users, posts, comments)
  } catch (error) {
    const { message } = error
    errorMessage.value = message
  }
}

const writeResponse = (users, posts, comments) => {
  usersResponse.value = users
  postsResponse.value = posts
  commentsResponse.value = comments
  return groupedPosts.value = transformResponse()
}

const transformResponse = () => {
  const postsByAuthor = {}
  postsResponse.value.forEach(post => {
    if (!postsByAuthor[post.userId]) {
      postsByAuthor[post.userId] = {
        author: usersResponse.value.find(user => user.id === post.userId),
        posts: [],
      }
    }
    postsByAuthor[post.userId].posts.push({
      ...post,
      comments: commentsResponse.value.filter(comment => comment.postId === post.id),
    })
  })
  return Object.values(postsByAuthor)
}

onMounted(async () => {
  await getResponse()
})
</script>
