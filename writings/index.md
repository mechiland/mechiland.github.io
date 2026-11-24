---
layout: base
title: 文章
permalink: /writings/
---

<div>
  <header class="mb-10">
    <h1 class="page-title">文章</h1>
    <p class="mt-2.5 text-[13px] text-[var(--muted)] tabular-nums">
      {{ site.posts.last.date | date: "%Y" }} — {{ site.posts.first.date | date: "%Y" }} · 共 {{ site.posts.size }} 篇文字
    </p>
  </header>

  {% include post-list.html posts=site.posts group_by_year=true %}
</div>
