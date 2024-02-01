import { ref, onMounted } from 'vue';

export function useTractor() {
  const replacer = [
    {
      search: /Meulemeershoeve/g,
      replace: '<span>Meulemeershoeve</span>'
    },
    {
      search: /<h1>/g,
      replace: ''
    },
    {
      search: /<\/h1>/g,
      replace: ''
    },
    {
      search: /<p>/g,
      replace: ''
    },
    {
      search: /<\/p>/g,
      replace: ''
    },
    {
      search: /<br>/g,
      replace: ''
    }
  ]

  const DOMPurify = ref(null)

  onMounted(async () => {
    DOMPurify.value = (await import('dompurify')).default
  })

  const replacerTractor = (data) => {
    if (DOMPurify.value) {
      let sanitizedHtml = DOMPurify.value.sanitize(data);
      replacer.forEach(({ search, replace }) => {
        sanitizedHtml = sanitizedHtml.replace(search, replace)
      })
      return sanitizedHtml
    }
    return ''
  }

  const tagChecker = (data, opentag, closeTag) => {
    return data.trim().startsWith(opentag) && data.trim().endsWith(closeTag);
  }

  return {
    replacerTractor,
    tagChecker
  }
}
