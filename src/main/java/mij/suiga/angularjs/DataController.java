package mij.suiga.angularjs;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.List;

@RestController
@RequestMapping(value = "/data")
public class DataController {

    private List<Map<String,String>> data;

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    List<Map<String,String>> get() {
        if (this.data == null) {
            this.data = new ArrayList<Map<String, String>>();
        }
        return this.data;
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    @ResponseBody
    List<Map<String,String>> add() {
        if (this.data == null) {
            this.data = new ArrayList<Map<String, String>>();
        }
        Map<String,String> m = new HashMap<String, String>();
        m.put("name","name_"+UUID.randomUUID().toString());
        m.put("gender","gender_"+UUID.randomUUID().toString());
        m.put("company","company_"+UUID.randomUUID().toString());

        this.data.add(m);
        return this.data;
    }

}
