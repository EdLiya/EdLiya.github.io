---
layout: post
title: UITextView属性详解
description: "2015回顾"
tags: [Javascript, ES6]
image:
  background: witewall_3.png
comments: true
share: true
---

## 图文混排时注意

图文混排时, **`UITextView`**的`text`和`attributedText`这两个属性会相互冲突。

根据文档说明

<!--more-->

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

{% highlight JavaScript %}

// 获得textView之前的富文本内容

NSMutableAttributedString *attributedText= [[NSMutableAttributedString alloc] initWithAttributedString:self.textView.attributedText];

// 然后统一对整段文本设置样式

[attributedText addAttribute:NSFontAttributeName value:self.textView.font range:NSMakeRange(0, attributedText.length)];

self.textView.attributedText = attributedText;

{% endhighlight %}

![11](http://7xqkdo.com1.z0.glb.clouddn.com/IMG_0041.JPG)

Objective-C

{% highlight Objective-C %}
NSString *str = [[NSString alloc] init];
str = @"你好";
UIView *view = [[UIView alloc] init];
int a = 4;
long b = 2;
NSString *str = [[NSString alloc] iniy];
int a = 5
str = @"你好";
UIView *view = [[UIView alloc] init];
CGFloat
{% endhighlight %}

## 测试
```
// 获得textView之前的富文本内容

NSMutableAttributedString *attributedText= [[NSMutableAttributedString alloc] initWithAttributedString:self.textView.attributedText];

// 然后统一对整段文本设置样式

[attributedText addAttribute:NSFontAttributeName value:self.textView.font range:NSMakeRange(0, attributedText.length)];

self.textView.attributedText = attributedText;
```

```
// 获得textView之前的富文本内容

NSMutableAttributedString *attributedText= [[NSMutableAttributedString alloc] initWithAttributedString:self.textView.attributedText];

// 然后统一对整段文本设置样式

[attributedText addAttribute:NSFontAttributeName value:self.textView.font range:NSMakeRange(0, attributedText.length)];

self.textView.attributedText = attributedText;
```



**文章来自 [{{ site.url }}]({{ site.url }})**