//package com.algamoney.api.repository.lancamento;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.persistence.TypedQuery;
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Predicate;
//import javax.persistence.criteria.Root;
//
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.Pageable;
//
//import com.algamoney.api.model.Lancamento;
//import com.algamoney.api.repository.filter.LancamentoFilter;
//import com.algamoney.api.repository.projection.ResumoLancamento;
//
//public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {
//	
//	@PersistenceContext
//	private EntityManager manager;
//
//	@Override
//	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable) {
//		CriteriaBuilder builder = manager.getCriteriaBuilder();
//		CriteriaQuery<Lancamento> criteria = builder.createQuery(Lancamento.class);
//		Root<Lancamento> root = criteria.from(Lancamento.class);
//		
//		//Criar restrições
//		Predicate[] predicates = CriarRestricoes(lancamentoFilter, builder, root);
//		criteria.where(predicates);
//		
//		TypedQuery<Lancamento> query = manager.createQuery(criteria);
//		adicionarResticoesDePaginacao(query, pageable);
//		
//		
//		return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
//	}
//	
//	@Override
//	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
//		CriteriaBuilder builder = manager.getCriteriaBuilder();
//		CriteriaQuery<ResumoLancamento> criteria = builder.createQuery(ResumoLancamento.class);
//		Root<Lancamento> root = criteria.from(Lancamento.class);
//		
//		criteria.select(builder.construct(ResumoLancamento.class 
//				, root.get("codigo"), root.get("descricao")
//				, root.get("dataVencimento"), root.get("dataPagamento")
//				, root.get("valor"), root.get("tipo")
//				, root.get("categoria").get("nome")
//				, root.get("pessoa").get("nome")));
//		
//		//Criar restrições
//		Predicate[] predicates = CriarRestricoes(lancamentoFilter, builder, root);
//		criteria.where(predicates);
//		
//		TypedQuery<ResumoLancamento> query = manager.createQuery(criteria);
//		adicionarResticoesDePaginacao(query, pageable);
//		
//		
//		return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
//	}
//
//	private Predicate[] CriarRestricoes(LancamentoFilter lancamentoFilter, CriteriaBuilder builder,
//			Root<Lancamento> root) {
//		List<Predicate> predicates = new ArrayList<>();
//		
//		if(!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
//			predicates.add(builder.like(
//					builder.lower(root.get("descricao")), "%" + lancamentoFilter.getDescricao().toLowerCase() + "%"));
//		}
//		
//		if(lancamentoFilter.getDataVencimentoDe() != null) {
//			predicates.add(builder.greaterThanOrEqualTo(root.get("dataVencimento"), lancamentoFilter.getDataVencimentoDe()));
//		}
//		
//		if(lancamentoFilter.getDataVencimentoAte() != null) {
//			predicates.add(builder.lessThanOrEqualTo(root.get("dataVencimento"), lancamentoFilter.getDataVencimentoAte()));
//		}
//		
//		return predicates.toArray(new Predicate[predicates.size()]);
//	}
//	
//	
//
//	private void adicionarResticoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
//		int paginaAtual = pageable.getPageNumber();
//		int totalRegistroPorPagina = pageable.getPageSize();
//		int primeiroRegistroDaPagina = paginaAtual * totalRegistroPorPagina;
//		
//		query.setFirstResult(primeiroRegistroDaPagina);
//		query.setMaxResults(totalRegistroPorPagina);
//	}
//	
//	private Long total(LancamentoFilter lancamentoFilter) {
//		CriteriaBuilder builder = manager.getCriteriaBuilder();
//		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
//		Root<Lancamento> root = criteria.from(Lancamento.class);
//		
//		Predicate[] predicates = CriarRestricoes(lancamentoFilter, builder, root);
//		criteria.where(predicates);
//		
//		criteria.select(builder.count(root));
//		return manager.createQuery(criteria).getSingleResult();
//	}
//
//}
//
package com.algamoney.api.repository.lancamento;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.algamoney.api.model.Lancamento;
import com.algamoney.api.repository.filter.LancamentoFilter;
import com.algamoney.api.repository.projection.ResumoLancamento;

public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable) {
        StringBuilder jpql = new StringBuilder();
        jpql.append("SELECT l FROM Lancamento l ");
        jpql.append("WHERE 1 = 1 ");

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            jpql.append("AND LOWER(l.descricao) LIKE :descricao ");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            jpql.append("AND l.dataVencimento >= :dataVencimentoDe ");
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            jpql.append("AND l.dataVencimento <= :dataVencimentoAte ");
        }

        TypedQuery<Lancamento> query = entityManager.createQuery(jpql.toString(), Lancamento.class);

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            query.setParameter("descricao", "%" + lancamentoFilter.getDescricao().toLowerCase() + "%");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            query.setParameter("dataVencimentoDe", lancamentoFilter.getDataVencimentoDe());
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            query.setParameter("dataVencimentoAte", lancamentoFilter.getDataVencimentoAte());
        }

        adicionarRestricoesDePaginacao(query, pageable);

        List<Lancamento> lancamentos = query.getResultList();
        return new PageImpl<>(lancamentos, pageable, total(lancamentoFilter));
    }

    @Override
    public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
        StringBuilder jpql = new StringBuilder();
        jpql.append("SELECT new com.algamoney.api.repository.projection.ResumoLancamento(");
        jpql.append("l.codigo, l.descricao, l.dataVencimento, l.dataPagamento, l.valor, l.tipo, c.nome, p.nome) ");
        jpql.append("FROM Lancamento l ");
        jpql.append("JOIN l.categoria c ");
        jpql.append("JOIN l.pessoa p ");
        jpql.append("WHERE 1 = 1 ");

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            jpql.append("AND LOWER(l.descricao) LIKE :descricao ");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            jpql.append("AND l.dataVencimento >= :dataVencimentoDe ");
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            jpql.append("AND l.dataVencimento <= :dataVencimentoAte ");
        }

        TypedQuery<ResumoLancamento> query = entityManager.createQuery(jpql.toString(), ResumoLancamento.class);

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            query.setParameter("descricao", "%" + lancamentoFilter.getDescricao().toLowerCase() + "%");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            query.setParameter("dataVencimentoDe", lancamentoFilter.getDataVencimentoDe());
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            query.setParameter("dataVencimentoAte", lancamentoFilter.getDataVencimentoAte());
        }

        adicionarRestricoesDePaginacao(query, pageable);

        List<ResumoLancamento> lancamentos = query.getResultList();
        return new PageImpl<>(lancamentos, pageable, total(lancamentoFilter));
    }

  //Criar restrições
    private void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
        int paginaAtual =  pageable.getPageNumber();
        int totalRegistroPorPagina = pageable.getPageSize();
        int primeiroRegistroDaPagina = paginaAtual * totalRegistroPorPagina;

        query.setFirstResult(primeiroRegistroDaPagina);
        query.setMaxResults(totalRegistroPorPagina);
   }

private Long total(LancamentoFilter lancamentoFilter) {
    StringBuilder jpql = new StringBuilder();
    jpql.append("SELECT COUNT(l) FROM Lancamento l ");
    jpql.append("WHERE 1 = 1 ");

    if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
        jpql.append("AND LOWER(l.descricao) LIKE :descricao ");
    }

    if (lancamentoFilter.getDataVencimentoDe() != null) {
        jpql.append("AND l.dataVencimento >= :dataVencimentoDe ");
    }

    if (lancamentoFilter.getDataVencimentoAte() != null) {
        jpql.append("AND l.dataVencimento <= :dataVencimentoAte ");
    }

    TypedQuery<Long> query = entityManager.createQuery(jpql.toString(), Long.class);

    if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
        query.setParameter("descricao", "%" + lancamentoFilter.getDescricao().toLowerCase() + "%");
    }

    if (lancamentoFilter.getDataVencimentoDe() != null) {
        query.setParameter("dataVencimentoDe", lancamentoFilter.getDataVencimentoDe());
    }

    if (lancamentoFilter.getDataVencimentoAte() != null) {
        query.setParameter("dataVencimentoAte", lancamentoFilter.getDataVencimentoAte());
    }

    return query.getSingleResult();
  }
}
