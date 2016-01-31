---
layout:     post
title:      "UITextView属性详解"
subtitle:   "图文混排"
date:       2016-01-31
author:     "ZSW"
header-img: "img/post-bg-2015.jpg"
tags:
    - iOS
    - UITextView
---

[TOC]

## 图文混排时注意

图文混排时, **`UITextView`**的`text`和`attributedText`这两个属性会相互冲突。

根据文档说明

**text**

> In iOS 6 and later, assigning a new value to this property also **replaces the value of the attributedText property with the same text**, albeit without any inherent style attributes. Instead the text view styles the new string using the **font**, **textColor**, and other style-related properties of the class.
> 
> **简译：**对这个属性赋新值会以相同文本更换原有的`attributedText`下的属性，TextView会以 **font**, **textColor**和其它相近的属性重新更换文本样式

**attributedText**

> This property is **nil** by default. Assigning a new value to this property also **replaces the value of the text property with the same string data**, albeit without any formatting information. In addition, assigning a new a value updates the values in the font, textColor, and textAlignment properties so that they reflect the style information starting at location 0 in the attributed string.
> 
> **简译：**默认为nil,对这个属性赋新值会以相同文本更换原有`text`下的属性
> 
> 就是会影响全部的attributed string.

因为text文字的大小交由font属性决定;

attributedText的文字大小由- addAttribute:value:range:方法决定;



``` 
// 获得textView之前的富文本内容

NSMutableAttributedString *attributedText= [[NSMutableAttributedString alloc] initWithAttributedString:self.textView.attributedText];

// 然后统一对整段文本设置样式

[attributedText addAttribute:NSFontAttributeName value:self.textView.font range:NSMakeRange(0, attributedText.length)];

self.textView.attributedText = attributedText;
```

## 测试标题二

> 测试图片
> 
> ![11](http://7xqkdo.com1.z0.glb.clouddn.com/IMG_0041.JPG)

## 测试标题三

**文章来自 [{{ site.url }}]({{ site.url }})**

