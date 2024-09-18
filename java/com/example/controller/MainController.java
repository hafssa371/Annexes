package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class MainController {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        // Forward vers index.html de React
        return "forward:/index.html";
    }
    
}
