package lx.edu.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lx.edu.springboot.dao.AddrBookDAO;
import lx.edu.springboot.vo.AddrBookVO;

@Controller
public class AddrBookController {
	
	@Autowired
	AddrBookDAO dao;
	
	@RequestMapping("/addrbook_form.do")
	public String form() {
		return "addrbook_form"; //jsp file name
	}
	
//	@RequestMapping("/addrbook_list.do")
//	public String list(HttpServletRequest req) throws Exception {
//		List<AddrBookVO> list = dao.getDBList();
//		// list를 request에 넣는다
//		req.setAttribute("data", list);
//		return "addrbook_list";
//	}
	
//	@RequestMapping("/addrbook_list.do")
//	public ModelAndView list() throws Exception {
//		ModelAndView result = new ModelAndView();
//		List<AddrBookVO> list = dao.getDBList();
//		// list를 request에 넣는다
//		//req.setAttribute("data", list);
//		result.addObject("data", list);
//		result.setViewName("addrbook_list");
//		return result;
//	}
	
	@RequestMapping("/addrbook_list.do")
	public String list(HttpSession session, HttpServletRequest req) throws Exception {
//		if (session.getAttribute("userId") == null) {
//			return "login";
//		}
		List<AddrBookVO> list = dao.getDBList();
		req.setAttribute("data", list);
		return "addrbook_list";
	}
	
	@RequestMapping("/insert.do")
//	public String insert(HttpServletRequest req) throws Exception {
//		//1. 데이터 받아서 vo에 담기
//		String abName = req.getParameter("abName");
//		AddrBookVO vo = new AddrBookVO();
//		vo.setAbName(abName);
//		//2. DB 저장(DAO에 있는 insertDB에 vo를 전달)
//		dao.insertDB(vo);
//		return "redirect:/addrbook_list.do";
//	}
	public String insert(AddrBookVO vo) throws Exception { //Spring에서는 이렇게 사용 가능!
		System.out.println(vo);
		dao.insertDB(vo);
		return "redirect:/addrbook_list.do";
	}
	
	@RequestMapping("/edit.do")
	   public String edit(@RequestParam("abId") int abId, HttpServletRequest req) throws Exception {
	       AddrBookVO vo = dao.getDB(abId);
	       req.setAttribute("ab", vo);
	       return "addrbook_edit_form";
	   }
	
	@RequestMapping("/update.do")
	public String update(AddrBookVO vo) throws Exception {
		dao.updateDB(vo);
		return "redirect:/addrbook_list.do";
	}
	
	@RequestMapping("/delete.do")
	public String delete(@RequestParam("abId") int abId) throws Exception {
		dao.deleteDB(abId);
		return "redirect:/addrbook_list.do";
	}

}
