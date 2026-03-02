---
layout: page
title: 文章
permalink: /writings/
---

<table class="writings-table">
  <!-- <thead>
    <tr>
      <th class="date">日期</th>
      <th>标题</th>
    </tr>
  </thead> -->
  <tbody>
    {%- assign date_format = site.date_format | default: "%Y-%m-%d" -%}
    {%- for post in site.posts -%}
    <tr>
      <td>
        <a class="link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </td>
      <td class="date">{{ post.date | date: date_format }}</td>
    </tr>
    {%- endfor -%}
  </tbody>
</table>
