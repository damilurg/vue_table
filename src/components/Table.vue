<template>
  <table class="section">
    <thead>
    <tr class="sticky top-3">
      <th v-for="header in TABLE_HEADER">{{ header.name }}</th>
    </tr>
    </thead>
    <tbody v-for="author of groupedPosts">
    <tr :class="{ 'sticky top-42': isExpanded(author.author.id, expandGroupId, isExpandGroup) }">
      <td>{{ author.author.id }}</td>
      <td>{{ author.author.username }}</td>
      <td>{{ author.author.name }}</td>
      <td>{{ author.author.company.name }}</td>
      <td>{{ author.author.website }}</td>
      <td>
        <button
          @click="expandHandler(author.author.id)"
        >
          {{ HEADER_NAME.EXPAND_GROUP }}
        </button>
      </td>
    </tr>
    <template v-if="isExpanded(author.author.id, expandGroupId, isExpandGroup)">
      <tr>
        <td v-for="header in TABLE_POSTS">{{ header.name }}</td>
      </tr>
      <template v-for="post of author.posts">
        <tr class="posts">
          <td>{{ post.id }}</td>
          <template v-if="!isExpanded(post.id, editMessageId, isEditMessage)">
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </template>
          <template v-else>
            <td><input v-model="post.title"></td>
            <td><textarea v-model="post.body" rows="10" cols="20"></textarea></td>
          </template>
          <td>{{ getWordsLength(post.body) }}</td>
          <td>{{ getCharsLength(post.body) }}</td>
          <td>
            <button
              @click="expandHandler(post.id, false)"
            >
              {{ HEADER_NAME.EDIT_POST }}
            </button>
          </td>
        </tr>
        <template v-if="isExpanded(post.id, editMessageId, isEditMessage)">
          <tr :class="{ 'sticky top-88': isExpanded(post.id, editMessageId, isEditMessage) }">
            <td
              v-for="header in COMMENTS_HEADER"
              :colspan="header.size ? header.size : 1"
            >
              {{ header.name }}
            </td>
          </tr>
          <tr v-for="comment of post.comments">
            <td>{{ comment.id }}</td>
            <td>{{ comment.email }}</td>
            <td>{{ comment.name }}</td>
            <td colspan="3">{{ comment.body }}</td>
          </tr>
        </template>
      </template>
    </template>
    </tbody>
  </table>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Table',
  props: {
    groupedPosts: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const editMessageId = ref(0)
    const expandGroupId = ref(0)
    const isEditMessage = ref(false)
    const isExpandGroup = ref(false)
    const getWordsLength = (message) => message.split(' ').length

    const getCharsLength = (message) => message.length

    const isExpanded = (id, ref1, ref2) => ref1 === id && ref2

    const toggleRefValues = (ref) => ref.value = !ref.value
    const setChosenGroup = (ref, id) => ref.value = id

    const expandHandler = (id, expand = true) => {
      if (expand) {
        setChosenGroup(expandGroupId, id)
        toggleRefValues(isExpandGroup)
      } else {
        setChosenGroup(editMessageId, id)
        toggleRefValues(isEditMessage)
      }
    }

    const HEADER_NAME = {
      ID: 'Id',
      NAME: 'Name',
      TITLE: 'Title',
      BODY: 'Body',
      WORDS: 'Words in body',
      CHARS: 'Chars in body',
      EDIT: 'Edit & Show comments',
      USERNAME: 'Username',
      WEBSITE: 'Website',
      EXPAND: 'Expand',
      COMPANY: 'Company',
      COMMENT: 'Comment',
      EMAIL: 'Email',
      EDIT_POST: 'Edit post & Show comments',
      EXPAND_GROUP: 'Expand Group',
    }

    const COMMENTS_HEADER = [
      {
        name: HEADER_NAME.ID,
      },
      {
        name: HEADER_NAME.EMAIL,
      },
      {
        name: HEADER_NAME.NAME,
      },
      {
        name: HEADER_NAME.COMMENT,
        size: 3,
      },
    ]

    const TABLE_HEADER = [
      {
        name: HEADER_NAME.ID,
      },
      {
        name: HEADER_NAME.NAME,
      },
      {
        name: HEADER_NAME.USERNAME,
      },
      {
        name: HEADER_NAME.COMPANY,
      },
      {
        name: HEADER_NAME.WEBSITE,
      },
      {
        name: HEADER_NAME.EXPAND,
      },
    ]

    const TABLE_POSTS = [
      {
        name: HEADER_NAME.ID,
      },
      {
        name: HEADER_NAME.NAME,
      },
      {
        name: HEADER_NAME.BODY,
      },
      {
        name: HEADER_NAME.WORDS,
      },
      {
        name: HEADER_NAME.CHARS,
      },
      {
        name: HEADER_NAME.EDIT,
      },
    ]

    return {
      COMMENTS_HEADER,
      TABLE_HEADER,
      TABLE_POSTS,
      HEADER_NAME,
      editMessageId,
      expandGroupId,
      isEditMessage,
      isExpandGroup,
      getWordsLength,
      getCharsLength,
      expandHandler,
      isExpanded,
    }
  },
})
</script>
